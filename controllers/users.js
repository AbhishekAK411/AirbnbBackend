import encrypt from "encryptjs";
import users from "../models/users.js";

export const register = async (req,res) =>{
    try{
        const {username, email, password, confirmPassword} = req.body;
        const registeredUser = await users.find({email}).exec();
        if(registeredUser.length) return res.send("User is already registered.");
        if(password.length < 8 && confirmPassword.length < 8){
            return res.send("Password should be more than 8 characters.");
        }
        if(password !== confirmPassword){
            return res.send("Passwords do not match.");
        }
        let secretKeyPass = "secretKeyPass";
        const decryptPass = encrypt.encrypt(password, secretKeyPass, 256);
        const newUser = new users({
            username,
            email,
            password : decryptPass
        });
        await newUser.save();
        return res.send("User is registered successfully.");
    }catch(err){
        return res.send(err);
    }
}