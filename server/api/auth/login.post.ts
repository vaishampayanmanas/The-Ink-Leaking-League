import jwt from "jsonwebtoken"
import prisma from "~/lib/prisma";
import bcrypt from "bcryptjs";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body

  // validate user credentials
  const user = await prisma.user.findUnique({
    where: { username }
  });
  if (!user) {
    setResponseStatus(event, 400)
    return {
      status: 'fail',
      message: 'Invalid username or password'
    }
  }

  if (await bcrypt.compare(password, user.password)) {
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
      accessToken,
      user: {
        username: user.username,
        email: user.email,
        role: user.role
      }
    }
  } else {
    setResponseStatus(event, 400)
    return {
      status: 'fail',
      message: 'Invalid username or password'
    }
  }
})
