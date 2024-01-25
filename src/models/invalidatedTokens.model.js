import { DataTypes } from "sequelize";
import { sequelize } from "../db.js"; // Asegúrate de importar tu instancia de Sequelize

export const InvalidatedToken = sequelize.define("InvalidatedToken", {
	token: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
});

