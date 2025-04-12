import { ServerFile } from "nuxt-file-storage"
import prisma from "~/lib/prisma";

const checkFileExt = (filename: string, validExts: string[]) => validExts.map((val) => filename.endsWith(val)).includes(true)

export default defineEventHandler(async (event) => {
  if (!event.context.auth) {
    setResponseStatus(event, 401);
    return {
      status: 'fail',
      message: 'unauthenticated'
    }
  }

  const challengeId = Number(getRouterParam(event, 'id'));
  const challenge = await prisma.challenge.findUnique({
    where: {
      id: challengeId
    }
  });

  if (!challenge) {
    setResponseStatus(event, 404);
    return {
      status: 'fail',
      message: 'Challenge not found'
    }
  }

  const user = event.context.auth.user;

  const { file, title } = await readBody<{ file: ServerFile, title: string }>(event);

  const uploadName = `${challengeId}.${user.userId}.${title.replaceAll(':', '').replaceAll('/', '').replaceAll(' ', '_')}`;

  if (!checkFileExt(file.name, ['.doc', '.docx', '.pdf', '.txt', '.rtf', '.pages', '.tex', 'wpd', '.abw'])) {
    setResponseStatus(event, 418);
    return {
      status: 'fail',
      message: 'only valid extensions allowed.'
    }
  }

  console.log(file.type);

  try {
    try {
      await storeFileLocally(file, uploadName, '/challengeResponses');
    } catch {
      setResponseStatus(event, 409);
      return {
        status: 'fail',
        message: 'conflict with currently existing file'
      }
    }

    await prisma.response.create({
      data: {
        title,
        fileUrl: `/challengeResponses/${uploadName}.${file.name.split('.').pop()}`,
        user: {
          connect: {
            id: Number(user.userId)
          }
        },
        challenge: {
          connect: {
            id: challengeId
          }
        }
      }
    });

    // award points
    const pointsAwarded = challenge.userId == user.userId ? 1 : 3;

    await prisma.points.create({
      data: {
        points: pointsAwarded,
        reason: 'challenge completion',
        user: {
          connect: {
            id: user.userId
          }
        }
      }
    })
    
  }  catch {
    setResponseStatus(event, 500);
    return {
      status: 'error',
      message: 'Internal server error - if you got this error, please report it to an admin or the owner immediatly along with details (where it happened, what action you were doing, etc) to help fix it as soon as possible.'
    }
  }
})
