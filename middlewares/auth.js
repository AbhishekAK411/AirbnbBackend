import users from "../models/users.js";
import encrypt from "encryptjs";

export const checkRegister = (req,res,next) =>{
    try{
        const { username, email, password, confirmPassword } = req.body;
        if(!username) return res.send("Username is required.");
        if(!email) return res.send("Email is required.");
        if(!password) return res.send("Password is required.");
        if(!confirmPassword) return res.send("Confirm password is required.");
        next();
    }catch(err){
        return res.send(err);
    }
}

export const checkUser = async (req,res,next) =>{
    try{
        const {email, password} = req.body;
        if(!email) return res.send("Email is required.");
        if(!password) return res.send("Password is required.");

        const user = await users.find({email}).exec();
        if(!user.length) return res.send("User not found.");

        let secretKeyPass = "secretKeyPass";
        const decryptPass = encrypt.decrypt(user[0].password, secretKeyPass, 256);
        let flag = false;
        if(password === decryptPass){
            flag = true;
        }
        if(flag){
            next();
        }else{
            return res.send("Password is incorrect.");
        }
        
    }catch(err){
        return res.send(err);
    }
}