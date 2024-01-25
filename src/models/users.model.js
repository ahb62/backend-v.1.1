import {DataTypes} from "sequelize";
import { sequelize } from "../db.js";
import bcrypt from "bcryptjs";

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


    // Relación entre Usuario y Permisos
