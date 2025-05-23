const user = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userLogin = async (req, res) => {
    const {email, password} = req.body;    
    try{
        const finduser = await user.findOne({email}).select('+password');            
        if(finduser) {
            const pwd = await bcrypt.compare(password, finduser.password);            
            if(pwd) {
                let id = finduser._id;
                let name = finduser.name;
                const token = await jwt.sign({id,name}, process.env.SECRET_KEY,{expiresIn:'1d'});                
                res.cookie('accessToken', token, {
                    expires : new Date(Date.now() + 1*24*60*60*1000), 
                    httpOnly: true,
                    sameSite: 'lax',
                    path: '/',
                    secure: false
                })
                res.status(200).json({"status": true,"message":'Login Successful!',token});
            } else {
                return res.status(401).json({"status": false, message: 'Invalid credentials' });
            }
        } else {
            res.status(401).json({"status": false,"message":'User not found!'});
        }
    } catch (error) {
        res.status(500).json({"status": false,"message":error.message});
    }
}

const userRegister = async(req, res) => {
    const {name, email, password, image} = req.body;
    try {        
        const finduser = await user.findOne({email}).select('+password');        
        if(finduser) {            
            return res.status(401).json({"status": false,"message":'Already User Exited!!'});
        }        
        const hashedPassword = await bcrypt.hash(password, 10);
        const userdata = new user({name,email,image,password:hashedPassword});
        await userdata.save();
        res.status(200).json({"status": true, message: 'User registered successfully' });
    } catch (error) {        
        res.status(500).json({"status": false,"message":error.message});
    }
}

module.exports = {userLogin, userRegister}