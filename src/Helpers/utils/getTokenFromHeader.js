const getTokenFromHeader = (req) => {
     /**
        //get tokem from header
        const authHeader = req.headers;
        const token = authHeader["authorization"].split(" ")[1];
    */
    const token = req?.headers?.authorization?.split(" ")[1]; //Optional chaining (?.)

    if(token !== undefined){
        return token;
    } else{
        return "No token found in the header";
    }
}

export default getTokenFromHeader