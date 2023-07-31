import jwt_decode from "jwt-decode";

export const checkTokenExpiration = (token:any) => {
    if (token!==null){
        const decodedToken: any = jwt_decode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds
        console.log("exp " +decodedToken.exp+" cur "+currentTime)
        if (decodedToken.exp < currentTime) {
            // Token has expired
            return true;
            // Token is still valid
            return false;
        }
    }else {
        return false;
    }

};