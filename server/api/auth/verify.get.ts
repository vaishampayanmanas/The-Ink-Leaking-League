export default defineEventHandler(async (event) => {
  if (event.context.auth) {
    return {
      statusCode: 200,
      validToken: true,
    }
  } else {
    return {
      statusCode: 200,
      validToken: false,
    }
  }
})
