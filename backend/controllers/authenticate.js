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

const userDetails =async(req, res) => {    
    console.log(req)
    const {id} = req.query;    
    try{
        const finduser = await user.findOne({_id:id});
        if(finduser) {
            res.status(200).json({"status": true,"data":finduser});
        } else {
            res.status(404).json({"status": false,"message":'User details wrong!'});  
        }

    } catch (error) {
        res.status(500).json({"status": false,"message":error.message});
    }
}

const userLogout = async(req, res) => {
    res.clearCookie('accessToken', {
        httpOnly: true,
        sameSite: 'lax', // or 'lax' or 'none'
        path: '/',
        secure: process.env.NODE_ENV === 'production', // Use secure in production
        expires : ''
    });
    res.status(200).json({ status : true, message: 'Logged out successfully' });
}

module.exports = {userLogin, userRegister, userDetails, userLogout}