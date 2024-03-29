

    
import  jwt  from "jsonwebtoken";
import { serialize, } from "cookie";
import  {UserModel}  from "../../models/users.model.js";
import {InvalidatedToken} from '../../models/invalidatedTokens.model.js';


    export const authSignUp = async (req, res) => {

        //Initializing a new user with the model and the body of the request
        const userData = new UserModel(req.body);
        
        try {
        //Checking if the user already exists
          const existingUser = await UserModel.findOne({ where: { email: userData.email } });
          if (existingUser) {
            //If the user already exists, send a message
            return res.status(400).json({ message: "user already exists" });
          }
            //If the user does not exist, encrypt the password and save the user in the table
          userData.password = await UserModel.encryptPassword(userData.password);
          await userData.save();
          const token = jwt.sign({id: userData._id}, "node-express-crud", {
            expiresIn: 30 * 30 * 12,
        });
        //Sending the token in the response
        const serialized = serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 30 * 30 * 12,
          path: "/",
        });
        
        res.setHeader("cookie", [serialized]);
        res.setHeader("Authorization", `Bearer ${token}`)
        res.status(201).json({ message: "user created" })
      } catch (error) {
          return res.status(500).json({ message: "Internal server error" });
        }
      };



    export const authLogin = async (req, res) => {
        // Initializing a new user with the model and the body of the request
        const userData = new UserModel(req.body);
        console.log(userData);

        try{
            // Checking if the user exists
            const validatingUser = await UserModel.findOne({where: {email: userData.email} });
            if(!validatingUser) {
                // If the user does not exist, send a message
              return res.status(400).json({message: "user does not exist"});

            }   else {
                // If the user exists, compare the password
                    if(!UserModel.comparePassword(userData.password, validatingUser.password)){ 
                        // If the password does not match, send a message
                        return res.status(401).json({message: "password or username do not match"});

                        }   else {
                                // If the password matches, send a token
                                const token = jwt.sign({id: validatingUser._id}, "node-express-crud", {
                                expiresIn: 30 * 30 * 12, });
                                const serialized = serialize("token", token, {
                                  httpOnly: true,
                                  secure: process.env.NODE_ENV !== "development",
                                  sameSite: "strict",
                                  maxAge: 1 * 30 * 1,
                                  path: "/",
                                });
                                res.setHeader("cookie", [serialized]);
                                res.setHeader("Authorization", `Bearer ${token}`)
                                return res.status(201).json({message: "user logged in"});
                            }
            }

        }
        catch(error){
          console.error(error);
            return res.status(500).json({message: "something went wrong, Internal Server Error"});
        }

    }

