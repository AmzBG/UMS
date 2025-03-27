const jwt = require("jsonwebtoken");


const authenticateToken = (req, res, next) =>{
    const token = req.cookies.token;
    if(token === undefined){
        // 401 unauthorized
        return res.redirect('/?message=Session%20expired');
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user)=>{
            if(err){
                // 403 forbidden
                throw new Error();
            }
            req.user = user;
            next();
        });
    } catch (e) {
        res.clearCookie("token");
        return res.redirect('/?message=Unauthorized%20access');
    }
}

module.exports = authenticateToken;