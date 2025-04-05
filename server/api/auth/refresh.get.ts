import jwt, { JwtPayload } from 'jsonwebtoken'
import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, 'refresh_token');

  if (!refreshToken) {
    setResponseStatus(event, 401);
    return {
      status: 'fail',
      message: 'No refresh token provided'
    }
  }
  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY!);
    if (typeof payload !== 'object' || payload === null || !('userId' in payload)) {
      throw new Error('Invalid token payload');
    }
    const user = await prisma.user.findUnique({
      where: { id: (payload as JwtPayload).userId }
    });

    if (!user) {
      setResponseStatus(event, 401);
      return {
        status: 'fail',
        message: 'User not found'
      }
    }

    const accessToken = jwt.sign({
      username: user.username,
      userId: user.id,
      access: user.role
    }, process.env.JWT_ACCESS_SECRET_KEY!, { expiresIn: '1h' });

    return {
      status: 'success',
      accessToken,
      user: {
        username: user.username,
        email: user.email,
        role: user.role
      }
    }
    
  } catch (err) {
    setResponseStatus(event, 401);
    return {
      status: 'fail',
      message: 'Invalid refresh token'
    }
  }
  
})
