
import  jwt  from "jsonwebtoken";
import  {UserModel}  from "../../models/users.model.js";


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
        res.status(201).header("Authorization", `Bearer ${token}`).send();

          
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
                                return res.status(200).json({token});
                            }
            }

        }
        catch(error){
          console.error(error);
            return res.status(500).json({message: "something went wrong, Internal Server Error"});
        }

    }