import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const responseId = getRouterParam(event, 'id');

  if (!responseId) {
    throw createError({statusCode: 400, statusText: 'Response id not provided'})
  }

  const response =  await prisma.response.findUnique({
    where: {
      id: Number(responseId)
    },
    select: {
      title: true,  
      fileUrl: true,
      reviews: {
        select: {
          review: true,
          rating: true,
          id: true,
          postedBy: {
            select: {
              username: true,
              id: true
            }
          }
        },
      }
    }
  });

  if (!response) {
    throw createError({ statusCode: 404, statusText: 'Response not found' });
  }

  return response;
})
