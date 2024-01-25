import { Router } from "express";
import {
	getAllAudios,
	getAudioById,
	createAudio,
	editAudio,
	deleteAudio,
} from "../../controllers/audio/audio.controller.js";

export const audio_router = Router();

// Rutas para los diferentes controladores
audio_router.get("/", getAllAudios);
audio_router.get("//:id", getAudioById);
audio_router.post("/", createAudio);
audio_router.put("//:id", editAudio);
audio_router.delete("//:id", deleteAudio);

