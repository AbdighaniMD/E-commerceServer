import getTokenFromHeader from '../../../Helpers/utils/getTokenFromHeader.js';
import verifyToken from '../../../Helpers/utils/verifyToken.js';

const loggedIn = (req, res,next) =>{
    //get token form header
    const token = getTokenFromHeader(req);

    //verify the tokon 
    const decodedUser = verifyToken(token);

    // save the user into req obj
   // req.userAuth = decodedUser.id;

    if (!decodedUser) {
        throw new Error("Invalid/Expired token, please login again");
    } else {
        req.userAuthId = decodedUser?.id;
        next();
    }
}

export default loggedIn