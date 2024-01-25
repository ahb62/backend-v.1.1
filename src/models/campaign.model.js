// campaign.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";


export const CampaignModel = sequelize.define('campaigns', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_campaign: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


