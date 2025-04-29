import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  if (!event.context.auth) {
    return createError({
      statusCode: 401,
      statusMessage: 'unauthenticated',
    })
  }
  const id = getRouterParam(event, 'id')
  if (event.context.auth.user.userId !== Number(id)) {
    return createError({
      statusCode: 403,
      statusMessage: 'forbidden',
    })

  }


  const body = await readBody(event)

  if (!body) {
    return createError({
      statusCode: 400,
      statusMessage: 'bad request',
    })
  }

  if (body.role || body.password) {
    return createError({
      statusCode: 400,
      statusMessage: 'bad request',
    })
  }

  try {
    await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: body
    })
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: 'internal server error',
    })
  }
})
