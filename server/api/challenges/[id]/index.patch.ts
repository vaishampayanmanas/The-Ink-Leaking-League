import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  if (!event.context.auth) {
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

  const newFields = await readBody(event)

  try {
  const newChallenge = await prisma.challenge.update({
    where: {
      id: Number(challengeId),
    },
    data: newFields
  });

  return {
    status: 'success',
    message: 'updated challenge successfully',
    data: newChallenge,
  }
  } catch {
    setResponseStatus(event, 403);
    return {
      status: 'fail',
      message: 'action forbiden'
    }
  }
})
