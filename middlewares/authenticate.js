import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
    if(req.cookies && req.cookies.jwt) {
        const token = req.cookies.jwt;      
        jwt.verify(token, 'secret', (err, decodedToken) => {
            if(err) {
                console.error('JWT verification error', err);
                res.locals.currentUser = null;
                next();
            } else { 
                res.locals.currentUser = { userId: decodedToken.userId };
                next();
            }
        });
    } else {
        res.locals.currentUser = null;
        next();
    }
}