let jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagoodb$oy';


const fetchuser = (req, res, next) => {
    const token = req.get('auth-token') ;
    if(!token){
        res.status(501).json({"error":"auth token is not there"});        
    }

    try{
        const data = jwt.verify(token, JWT_SECRET);
        console.log("user verification is " + data.user.id);
        req.user = data.user;
        next();
    }catch(error){
        res.status(501).json({"error":"error in token verificaiton "});
    }
}
module.exports = fetchuser;