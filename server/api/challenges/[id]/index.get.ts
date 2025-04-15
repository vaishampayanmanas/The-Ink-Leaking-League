import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  if (!id) {
    setResponseStatus(event, 404);
    return {
      status: 'fail',
      message: 'challenge not found!'
    }
  }

  const challenge = await prisma.challenge.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      participants: {
        select: {
          username: true
        }
      },
      responses: {
        select: {
          title: true,
          id: true,
        }
      },
      user: {
        select: {
          username: true
        }
      }
    }
  });

  if (challenge) {
    return challenge;
  } else {
    setResponseStatus(event, 404)
    return {
      status: 'fail',
      message: 'Challenge not found'
    }
  }
})
