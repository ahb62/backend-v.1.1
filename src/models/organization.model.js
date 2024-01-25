// organization.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
export const OrganizationModel = sequelize.define('organizations', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_organizacion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


