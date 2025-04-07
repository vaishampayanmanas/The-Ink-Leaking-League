import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  if (!event.context.auth) {
    return createError({
      statusCode: 401,
      statusMessage: 'Please login to continue',
    })
  }

  const user = event.context.auth.user
  const body = await readBody(event);
  const { title, description, deadline } = body
  const id = user.userId

  try {
    const challenge = await prisma.challenge.create({
      data: {
        title,
        description,
        deadline: new Date(deadline),
        user: {
          connect: {
            id
          }
        }
      }
    })

    setResponseStatus(event, 201)
    return {
      status: 'success',
      challenge
    }
  }

  catch (error) {
    setResponseStatus(event, 400)
    return {
      status: 'fail',
      message: 'Invalid data; check your request body'
    }
  }
})
