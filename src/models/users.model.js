// users.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import bcrypt from "bcryptjs";
import { OrganizationModel } from "./organization.model.js";

export const UserModel = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cellphone: {
        type: DataTypes.STRING,
        allowNull: true,
    }, 
    cedula: {
        type: DataTypes.STRING,
        allowNull: true
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

UserModel.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

UserModel.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
};

// Define el modelo intermedio para la asociación
const UserOrganization = sequelize.define('UserOrganization', {});

// Define la asociación entre UserModel y OrganizationModel con la opción 'through'
UserModel.belongsToMany(OrganizationModel, {
    through: UserOrganization,
    as: 'organizations',
    foreignKey: 'userId',
    otherKey: 'organizationId'
});

OrganizationModel.belongsToMany(UserModel, {
    through: UserOrganization,
    as: 'users',
    foreignKey: 'organizationId',
    otherKey: 'userId'
});
