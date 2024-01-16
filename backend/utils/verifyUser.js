import jwt from 'jsonwebtoken'

export const verifyUser = (req, res, next) => {
    const token = req.cookies && req.cookies.access_token;

    if(!token) {
        res.status(401);
        throw new Error(`You are not authenticated!`);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            res.status(401);
            throw new Error(`Invalid token!`);
        }

        req.user = user;
        next();
    })
}