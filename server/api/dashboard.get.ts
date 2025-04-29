import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  if (!event.context.auth) {
    setResponseStatus(event, 401)
    return {
      status: 'fail',
      message: 'Unauthorized; Invalid access token'
    }
  }

  const userId = event.context.auth.user.userId
  const user = await prisma.user.findUnique({
    omit: {
      password: true,
    },
    where: { id: userId },
    include: {
      followers: {
        select: {
          username: true,
          points: {
            select: {
              points: true
            }
          }
        }
      },
      following: {
        select: {
          username: true,
          points: {
            select: {
              points: true
            }
          }
        }
      },
      points: {
        select: {
          points: true,
          reason: true,
          createdAt: true,
        }
      },
      challengesCreated: {
        select: {
          title: true,
          description: true,
        }
      },
      challenges: {
        select: {
          title: true,
        }
      },
      responses: {
        select: {
          title: true,
        }
      },
      recievedMessages: {
        select: {
          title: true,
        }
      }
    }
  });

  if (!user) {
    setResponseStatus(event, 404)
    return {
      status: 'fail',
      message: 'Invalid access token; User not found'
    }
  }

  return {
    status: 'success',
    data: {
      user
    }
  }
})
