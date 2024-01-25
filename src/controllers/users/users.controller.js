import  {UserModel}  from "../../models/users.model.js";
import { OrganizationModel } from "../../models/organization.model.js"; 


export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll({ include: 'organizations' });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: "Error",
            error,
        });
    }
};
export const getUserById = async (req, res) => {
    try {
        const user = await UserModel.findByPk(req.params.id, { include: 'organizations' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: "Error",
            error,
        });
    }
};



export const createUser = async (req, res) => {
    try {
        const userData = req.body;

        // Crear una instancia del usuario con los datos proporcionados
        const user = await UserModel.create(userData);

        // Obtener IDs de organizaciones que se deben asociar al usuario
        const organizationIds = req.body.organizationIds; // Ajusta según la estructura de tu solicitud

        // Verificar si hay organizaciones proporcionadas
        if (organizationIds && organizationIds.length > 0) {
            // Obtener las organizaciones según los IDs proporcionados
            const organizations = await OrganizationModel.findAll({
                where: { id: organizationIds }
            });

            // Asociar las organizaciones al usuario
            await user.setOrganizations(organizations);
        }

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({
            message: "Error",
            error,
        });
    }
};




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