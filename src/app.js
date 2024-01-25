import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import Connecting from "./db.js";
import "./models/users.model.js";
import { auth_routes } from "./routes/auth/auth.route.js";
import { users_routes } from "./routes/users/users.route.js";
import { calendar_router } from "./routes/calendar/calendar.route.js";
import { organization_router } from "./routes/organization/organization.route.js";
import { campaign_router } from "./routes/campaign/campaign.route.js";
import {audio_router} from "./routes/audio/audio.route.js";

export const app = express();
app.use(cors());
export const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Connecting();

app.use("/auth", auth_routes);
app.use("/users", users_routes);
app.use("/calendar", calendar_router);
app.use("/organization", organization_router);
app.use("/campaign", campaign_router);
app.use("/audio", audio_router);

// Middleware de error global
app.use((err, req, res, next) => {
    console.error("Error global:", err);
    res.status(500).json({ error: "Error interno del servidor" });
});



const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "My API",
        version: "1.0.0",
        description: "API for my app",
    },
};

const swaggerOptions = {
    swaggerDefinition,
    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/swagger-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", (req, res) => {
    res
        .status(200)
        .json(
            "Hello! Welcome to my API. You want to know more about me? Visit this link: https://beacons.ai/ahb.62 "
        );
});
