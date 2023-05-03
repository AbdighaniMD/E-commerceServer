import jwt from "jsonwebtoken";

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        //console.log(err);
        if (err) {
            return false;
        } else {
            return decoded;
        }
    });
};

export default verifyToken;