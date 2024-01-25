import {sequelize} from "../db.js";
import { DataTypes } from "sequelize";
export const Videomute = sequelize.define("Videomute", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
	filename: {
		type: DataTypes.STRING,
		allowNull: false,
	},
    fileOriginalName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
	fileType: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	filePath: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});
