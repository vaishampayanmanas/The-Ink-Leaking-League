import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    console.log(event.context.auth)
    const users = await prisma.user.findMany({
        include: {
            points: {
                select: {
                    points: true
                }
            }
        }
    })

    return users
});