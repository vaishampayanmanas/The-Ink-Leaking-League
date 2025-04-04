import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
    const user = (
        function () {
            const headers = getHeaders(event);
            const accessToken = headers.auth
            if (accessToken) {
                try {
                    return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET_KEY!);
                } catch {
                    return null
                }
                
            } else {
                return null
            }
        })()
    
    if (user) event.context.auth = { user };
    else event.context.auth = null;
})
