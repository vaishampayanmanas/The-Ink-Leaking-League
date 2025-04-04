import prisma from "~/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const { username, email, password } = await readBody(event);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: await bcrypt.hash(password, 12),
        goal: -1,
        role: 'Member'
      }
    });

    const accessToken = jwt.sign({
      username,
      userId: user.id,
      access: user.role
    }, process.env.JWT_ACCESS_SECRET_KEY!, { expiresIn: '1h' });

    const refreshToken = jwt.sign({
      userId: user.id,
    }, process.env.JWT_REFRESH_SECRET_KEY!, { expiresIn: '7d' });

    await prisma.session.create({
      data: {
        userId: user.id,
        token: await bcrypt.hash(refreshToken, 14)
      }
    })

    setResponseStatus(event, 201);
    setCookie(event, 'refresh_token', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })
    return {
      status: 'success',
      accessToken
    }
  } catch {
    setResponseStatus(event, 400)
    return {
      status: 'fail',
      message: 'user exists'
    }
  }
})
