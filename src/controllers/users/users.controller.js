import  {UserModel}  from "../../models/users.model.js";
export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: "Error",
            error,
        });
    }
};  

export const getUserById = async (req, res) => {
    try{
        const user = await UserModel.findByPk(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: "Error",
            error
        })
    }
}
export const createUser = async (req, res) => {
    try{
        const user = new UserModel(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({
            message: "Error",
            error,
        });
    }
}


export const updateUser = async (req, res) => {
    try{
        const user = await UserModel.findByPk(req.params.id);
        user.update(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: "Error",
            error,
        });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await UserModel.findByPk(req.params.id);
        await user.destroy();
        res.status(200).json(user);
    } catch(error) {
        res.status(500).json({
            message: "Error",
            error,
        });
    }
}