import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  if (!event.context.auth) {
    throw createError({ statusCode: 403, statusText: 'Unauthorized' })
  }

  const body = await readBody(event);
  const responseId = body.responseId;
  const comment = body.review;
  const userId = event.context.auth.user.userId;
  const rating = body.rating;
  
  if (!responseId || !comment || !rating) {
    throw createError({ statusCode: 400, statusText: 'invalid request body' });
  }

  const review = await prisma.review.create({
    data: {
      review: comment,
      postedBy: {
        connect: {
          id: userId,
        },
      },
      rating: rating,
      response: {
        connect: {
          id: Number(responseId),
        },
      }
    },
  });

  return { message: 'Comment added successfully' };
})
