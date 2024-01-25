// organizationController.js
import { OrganizationModel } from "../../models/organization.model.js";

// Obtener todas las organizaciones
export const getOrganizations = async (req, res) => {
    try {
        console.log("Antes de la consulta a la base de datos");
        const organizations = await OrganizationModel.findAll();
        console.log("Después de la consulta a la base de datos");

        if (organizations.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(organizations);
    } catch (error) {
        console.error("Error en getOrganizations:", error);
        res.status(500).json({ error: "Error al obtener las organizaciones" });
    }
};



// Crear una nueva organización
export const createOrganization = async (req, res) => {
    try {
        const organization = await OrganizationModel.create(req.body);
        res.status(201).json(organization);
    } catch (error) {
        res.status(500).json({ error: "Error al crear la organización" });
    }
};

// Obtener una organización por ID
export const getOrganizationById = async (req, res) => {
    try {
        const organization = await OrganizationModel.findByPk(req.params.id);

        if (!organization) {
            return res.status(404).json({ error: "Organización no encontrada" });
        }

        res.json(organization);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener la organización" });
    }
};

// Actualizar una organización por ID
export const updateOrganization = async (req, res) => {
    try {
        const { id_organizacion, name } = req.body;
        const organization = await OrganizationModel.findByPk(req.params.id);

        if (!organization) {
            return res.status(404).json({ error: "Organización no encontrada" });
        }

        await organization.update({ id_organizacion, name });

        res.json(organization);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la organización" });
    }
};
// Eliminar una organización por ID
export const deleteOrganization = async (req, res) => {
    try {
        const organization = await OrganizationModel.findByPk(req.params.id);

        if (!organization) {
            return res.status(404).json({ error: "Organización no encontrada" });
        }

        await organization.destroy();

        res.json({ message: "Organización eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la organización" });
    }
};