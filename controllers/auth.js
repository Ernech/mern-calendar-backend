const {request,response} = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateJWT }= require('../helpers/jwt');

const newUser = async(req=request,res=response)=>{

    const { email, password } = req.body;
    
    try {
        let user = await User.findOne({email}); 
        if(user){
            return res.status(400).json({
                ok:false,
                msg:`There's already a unser with the email ${user.email} in the DB`
            });
        }
        
        //Crypt password
        const salt = bcrypt.genSaltSync();
        const cryptedPassowrd = bcrypt.hashSync(password, salt);
        
        user = new User({...req.body,password:cryptedPassowrd});

        await user.save();
        //generate token
        const token= await generateJWT(user._id,user.name);
        res.status(201).json({
            ok:true,
            uid:user._id,
            name:user.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Please, talk with the admin'
        });
    }
} 

const loginUser = async(req,res=response)=>{

    const { email, password }= req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                ok:false,
                msg:"The user creentials are wrong"
            });
        }
        const validPassword = bcrypt.compareSync(password,user.password);
        if(!validPassword){
            return res.status(400).json({
                of:false,
                msg:'Incorrect password'
            });
        }
        const token= await generateJWT(user._id,user.name);
        
        res.status(200).json({
            ok:true,
            uid:user._id,
            name: user.name,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Please, talk with the admin'
        });
    }

}

const renewToken = async(req,res=response)=>{
    
    const uid = req.uid;
    const name = req.name;
    //Generate new JWT and return
    const token = await generateJWT(uid,name);
    res.json({ok:true,uid,name,token});
}

module.exports={newUser,loginUser,renewToken}