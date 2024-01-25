// organization.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { CampaignModel } from "./campaign.model.js"; // Asegúrate de importar el modelo de campaña

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

// Define el modelo intermedio para la asociación
const OrganizationCampaign = sequelize.define('OrganizationCampaign', {});

// Define la asociación entre OrganizationModel y CampaignModel con la opción 'through'
OrganizationModel.belongsToMany(CampaignModel, {
    through: OrganizationCampaign,
    as: 'campaigns',
    foreignKey: 'organizationId',
    otherKey: 'campaignId'
});

CampaignModel.belongsToMany(OrganizationModel, {
    through: OrganizationCampaign,
    as: 'organizations',
    foreignKey: 'campaignId',
    otherKey: 'organizationId'
});
