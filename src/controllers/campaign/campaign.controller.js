// campaignController.js
import { CampaignModel } from "../../models/campaign.model.js";
import { OrganizationModel } from "../../models/organization.model.js";
// Obtener todas las campañas
export const getCampaigns = async (req, res) => {
    try {
        const campaigns = await CampaignModel.findAll();
        res.json(campaigns);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las campañas" });
    }
};

export const createCampaign = async (req, res) => {
    try {
        const { id_campaign, name, organizationId } = req.body;

        // Verificar si se proporcionó el ID de la organización
        if (!organizationId) {
            return res.status(400).json({ error: "Se requiere proporcionar el ID de la organización." });
        }

        // Obtener la organización por su ID
        const organization = await OrganizationModel.findByPk(organizationId);

        // Verificar si la organización existe
        if (!organization) {
            return res.status(404).json({ error: "Organización no encontrada para asociar la campaña." });
        }

        // Crear la campaña
        const campaign = await CampaignModel.create({ id_campaign, name });

        // Asociar la campaña a la organización
        await organization.addCampaign(campaign);

        res.status(201).json(campaign);
    } catch (error) {
        res.status(500).json({ error: "Error al crear la campaña" });
    }
};


// Obtener una campaña por ID
export const getCampaignById = async (req, res) => {
    try {
        const campaign = await CampaignModel.findByPk(req.params.id);

        if (!campaign) {
            return res.status(404).json({ error: "Campaña no encontrada" });
        }

        res.json(campaign);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener la campaña" });
    }
};

// Actualizar una campaña por ID

export const updateCampaign = async (req, res) => {
    try {
        const { id_campaign, name } = req.body;
        const campaign = await CampaignModel.findByPk(req.params.id);

        if (!campaign) {
            return res.status(404).json({ error: "Campaña no encontrada" });
        }

        await campaign.update({ id_campaign, name });

        res.json(campaign);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la campaña" });
    }
};
// Eliminar una campaña por ID
export const deleteCampaign = async (req, res) => {
    try {
        const campaign = await CampaignModel.findByPk(req.params.id);

        if (!campaign) {
            return res.status(404).json({ error: "Campaña no encontrada" });
        }

        await campaign.destroy();

        res.json({ message: "Campaña eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la campaña" });
    }
};
