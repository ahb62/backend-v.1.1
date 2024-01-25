import {sequelize} from "../db.js";
import { DataTypes } from "sequelize";
import { OrganizationModel } from "./organization.model.js";
import {CampaignModel} from "./campaign.model.js";
import {UserModel} from "./users.model.js";
export const Audio = sequelize.define("Audio", {
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
	status: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true, // Puedes establecer un valor predeterminado si es necesario
	},
});

Audio.belongsTo(OrganizationModel, { as: 'organization' });
Audio.belongsTo(CampaignModel, { as: 'campaign' });
