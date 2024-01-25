import { Router } from "express";
import multer from "multer";
import path from "path";

import {
	getAllAudios,
	getAudioById,
	createAudio,
	editAudio,
	deleteAudio,
	getAudioByFilename,
	streamAudio,
} from "../../controllers/audio/audio.controller.js";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads"); // Carpeta donde se almacenarán los archivos subidos
	},
	filename: (req, file, cb) => {
		const extname = path.extname(file.originalname);
		const filename = `${Date.now()}${extname}`;
		cb(null, filename);
	},
});

// Configuración de multer con la configuración de almacenamiento
export const upload = multer({ storage: storage });

export const audio_router = Router();
// Rutas para los diferentes controladores
audio_router.get("/", getAllAudios);
audio_router.get("/:id", getAudioById);
audio_router.post("/", upload.array("audioFiles", 5), createAudio);
audio_router.put("/:id", editAudio);
audio_router.delete("/:id", deleteAudio);
// Ruta para servir archivos de audio por nombre
audio_router.get("/file/:filename", getAudioByFilename);
audio_router.get("/stream/:filename", streamAudio);

