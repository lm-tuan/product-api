const jwt = require('jsonwebtoken');

module.exports.authMiddleware = (req, res, next) => {
    const token = req.headers.access_token;
    if(token){
        jwt.verify(token,process.env.JWT_SCREET, (err , decoded) => {
            if(err) {
                return res.json({ message: "invalid token" });
            }else{
                req.decoded = decoded;
                next();
            }
        })
    }else{
        res.send({ message: "No token provided." });
    }
}