import { Audio } from "../../models/audio.model.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import path from "path";
import { CampaignModel } from "../../models/campaign.model.js";
import { OrganizationModel } from "../../models/organization.model.js";

// Obtener todos los audios
const getAllAudios = async (req, res) => {
	try {
		const audios = await Audio.findAll();
		res.json(audios);
	} catch (error) {
		res.status(500).json({ error: "Error al obtener los audios" });
	}
};

// Obtener un audio por ID
const getAudioById = async (req, res) => {
	const { id } = req.params;
	try {
		const audio = await Audio.findByPk(id);
		if (audio) {
			res.json(audio);
		} else {
			res.status(404).json({ error: "Audio no encontrado" });
		}
	} catch (error) {
		res.status(500).json({ error: "Error al obtener el audio" });
	}
};

const createAudio = async (req, res) => {
	try {

		const { campaignId, organizationId } = req.body;

		const campaign = await CampaignModel.findByPk(campaignId);
        const organization = await OrganizationModel.findByPk(organizationId);

        if (!campaign || !organization) {
            return res.status(404).json({ error: "Campaña u organización no encontrada" });
        }

		if (!req.files || !req.files.length) {
			return res
				.status(400)
				.json({ error: "No se ha proporcionado ningún archivo" });
		}

		const audioBaseUrl = "http://localhost:3001/audio/stream";

		// Almacenar detalles de cada archivo en un arreglo
		const newAudios = await Promise.all(
			req.files.map(async (file) => {
				const filePath = `${audioBaseUrl}/${file.filename}`;

				// Crear un nuevo audio y obtener el objeto resultante
				const newAudio = await Audio.create({
					filename: file.filename,
					fileOriginalName: file.originalname,
					fileType: file.mimetype,
					filePath,
					status: true,
					campaignId: campaignId, 
					organizationId: organizationId, // Establece un valor predeterminado para status
				});

				// Devolver los detalles del audio
				return {
					id: newAudio.id,
					filename: newAudio.filename,
					fileOriginalName: newAudio.fileOriginalName,
					fileType: newAudio.fileType,
					filePath: newAudio.filePath,
					status: newAudio.status,
					campaignId: newAudio.campaignId,
					organizationId: newAudio.organizationId,
				};
			})
		);

		res.status(201).json(newAudios);
	} catch (error) {
		console.error("Error al crear los audios:", error);
		res.status(500).json({ error: "Error al crear los audios" });
	}
};







// Editar un audio por ID
const editAudio = async (req, res) => {
    const { id } = req.params;
    const { filename, fileOriginalName, fileType, filePath, status, campaignId, organizationId } = req.body;
    
    try {
        const audio = await Audio.findByPk(id);

        if (audio) {
            // Validar la existencia de la campaña y la organización
            if (campaignId) {
                const campaign = await CampaignModel.findByPk(campaignId);
                if (!campaign) {
                    return res.status(404).json({ error: "Campaña no encontrada" });
                }
            }

            if (organizationId) {
                const organization = await OrganizationModel.findByPk(organizationId);
                if (!organization) {
                    return res.status(404).json({ error: "Organización no encontrada" });
                }
            }

            // Actualizar las propiedades del audio
            await audio.update({
                filename,
                fileOriginalName,
                fileType,
                filePath,
                status,
                campaignId, 
                organizationId,
            });

            res.json({ message: "Audio editado exitosamente" });
        } else {
            res.status(404).json({ error: "Audio no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al editar el audio" });
    }
};



// Eliminar un audio por ID
const deleteAudio = async (req, res) => {
	const { id } = req.params;
	try {
		const audio = await Audio.findByPk(id);
		if (audio) {
			await audio.destroy();
			res.json({ message: "Audio eliminado exitosamente" });
		} else {
			res.status(404).json({ error: "Audio no encontrado" });
		}
	} catch (error) {
		res.status(500).json({ error: "Error al eliminar el audio" });
	}
};

// Obtener un audio por nombre de archivo
const getAudioByFilename = async (req, res) => {
	const { filename } = req.params;
	try {
		const audio = await Audio.findOne({
			where: { filename },
		});
		if (audio) {
			res.json({ audio, audioFilePath: audio.filePath });
		} else {
			res.status(404).json({ error: "Audio no encontrado" });
		}
	} catch (error) {
		res.status(500).json({ error: "Error al obtener el audio" });
	}
};

const streamAudio = (req, res) => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename);
	const { filename } = req.params;
	const filePath = path.join(__dirname, "../../../uploads", filename);

	if (fs.existsSync(filePath)) {
		res.setHeader("Content-Type", "audio/mpeg");
		const readStream = fs.createReadStream(filePath);
		readStream.pipe(res);
	} else {
		res.status(404).json({ error: "Archivo no encontrado" });
	}
};

export {
	getAllAudios,
	getAudioByFilename,
	getAudioById,
	createAudio,
	editAudio,
	deleteAudio,
	streamAudio,
};
