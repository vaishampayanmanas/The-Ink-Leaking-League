import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  if (!event.context.auth) {
    setResponseStatus(event, 401);
    return {
      status: 'fail',
      message: 'Unauthenticated'
    }
  }

  const challengeId = getRouterParam(event, 'id');
  const user = event.context.auth.user;

  try {
    await prisma.challenge.update({
      where: {
        id: Number(challengeId)
      },

      data: {
        participants: {
          connect: {
            id: Number(user.userId)
          }
        }
      }
    })

    return {
      status: 'success',
      message: 'Successfully joined the challenge!'
    }
  } catch {
    setResponseStatus(event, 400);
    return {
      status: 'fail',
      message: 'Already in challenge!'
    }
  }
})