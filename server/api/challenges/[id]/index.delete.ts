import prisma from "~/lib/prisma";
import bcrypt from 'bcryptjs';

export default defineEventHandler(async (event) => {
  console.log('request!!')
  if (!event.context.auth) {
    console.log('3')
    setResponseStatus(event, 401);
    return {
      status: 'fail',
      message: 'unauthenticated'
    }
  }

  const challengeId = getRouterParam(event, 'id');

  const user = event.context.auth.user;
  const challenge = await prisma.challenge.findUnique({
    where: {
      id: Number(challengeId),
    }
  });

  if (!challenge) {
    setResponseStatus(event, 404);
    return {
      status: 'fail',
      message: 'challenge not found'
    }
  }

  if (challenge.userId !== user.userId) {
    setResponseStatus(event, 403);
    return {
      status: 'fail',
      message: 'action forbiden'
    }
  }

  const body = await readBody(event);
  if (!body) {
    console.log('1')
    setResponseStatus(event, 401);
    return {
      status: 'fail',
      message: 'reauthentication required'
    }
  }

  const password = body.password;

  if (!password) {
    setResponseStatus(event, 401);
    console.log('2')
    return {
      status: 'fail',
      message: 'reauthentication required'
    }
  }

  const actualUser = await prisma.user.findUnique({
    where: {
      id: user.userId
    }
  });

  if (!actualUser) {
    setResponseStatus(event, 404);
    return {
      status: 'fail',
      message: 'unknown user'
    }
  }

  if (!(await bcrypt.compare(password, actualUser.password))) {
    setResponseStatus(event, 400);
    return {
      status: 'fail',
      message: 'incorrect password'
    }
  }

  try {
  const newChallenge = await prisma.challenge.delete({
    where: {
      id: Number(challengeId),
    }
  });
  } catch {
    setResponseStatus(event, 403);
    return {
      status: 'fail',
      message: 'action forbiden'
    }
  }
})
