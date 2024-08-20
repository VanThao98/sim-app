import jwt from "jsonwebtoken";

const authorize = async (request, response, next) => {
    const token =request.cookies.token || request.headers.authorization && request.headers.authorization.split(' ')[1]; // Kiểm tra token trong cookie hoặc header
    console.log('token',token)
    if (!token) {
        return response.status(401).send("Not authorized");
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        request.user = decode.user;

        next();
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
};

export default authorize;
