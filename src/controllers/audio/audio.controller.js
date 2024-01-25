import { Audio } from "../../models/audio.model.js";

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

// Crear un nuevo audio
const createAudio = async (req, res) => {
	const { filename, fileOriginalName, fileType, filePath } = req.body;
	try {
		const newAudio = await Audio.create({
			filename,
			fileOriginalName,
			fileType,
			filePath,
		});
		res.status(201).json(newAudio);
	} catch (error) {
		res.status(500).json({ error: "Error al crear el audio" });
	}
};

// Editar un audio por ID
const editAudio = async (req, res) => {
	const { id } = req.params;
	const { filename, fileOriginalName, fileType, filePath } = req.body;
	try {
		const audio = await Audio.findByPk(id);
		if (audio) {
			await audio.update({
				filename,
				fileOriginalName,
				fileType,
				filePath,
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

export { getAllAudios, getAudioById, createAudio, editAudio, deleteAudio };
