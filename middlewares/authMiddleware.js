// ### If Token is Valid:

// - Middleware says: "Access granted"
// - Now your **controller runs** (e.g., show profile)
import jwt from "jsonwebtoken"

const authChecker = async (req, res, next) => {
    try {
        const authHeaders = req.headers.authorization
        console.log("Auth Header:", authHeaders);
        // i need to split the auth header as the bearer as one element and token as another element
    //     const splitAuthHeader = authHeaders.split(" ");
    //     /*    [
    //          'Bearer',
    //          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODYxN2I2NTVmNTRjZDhhMTg1Nzc1MTYiLCJpYXQiOjE3NTE1NzY2MDksImV4cCI6MTc1MjQ0MDYwOX0.89s7Kk0ERDyUOthvlH-OabBIU-cadGYvpdJqfnk9pmY'
    //            ]
    //    */
    //     console.log(splitAuthHeader);
    //     // we only require the token not the bearer so
    //     const token = splitAuthHeader[1]
    //     // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODYxN2I2NTVmNTRjZDhhMTg1Nzc1MTYiLCJpYXQiOjE3NTE1NzY2MDksImV4cCI6MTc1MjQ0MDYwOX0.89s7Kk0ERDyUOthvlH-OabBIU-cadGYvpdJqfnk9pmY
    //     console.log(token);

    // if there is no token then
    if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    return res.status(400).json({ message: "No token provided or format is invalid" });
}

    const token = authHeaders.split(" ")[1];

        // checking the authorisation -to check the provided token is correct
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    
        console.log(decodedToken);

        if (decodedToken.userId) {
           req.UserId = decodedToken.userId;
            next()
        }


    } catch (error) {
        console.error("Error in authChecker:", error);
        res.status(401).json({ message: "Unauthorized" });
    }
}

export default authChecker