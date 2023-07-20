const {request,response} = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req=request,res=response,next)=>{
    //
    const token = req.header('x-token')
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:"There's not a JWT in the request"
        });
    }
    try {
        const { uid, name } = jwt.verify(token,process.env.SECRET_JWT_KEY);
       req.uid=uid;
       req.name = name;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Please, talk with the admin'
        });
    }
}


module.exports={validateJWT}