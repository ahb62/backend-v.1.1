import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
//Setting express in app 
export const app = express();
// enabling cors
import cors from 'cors';
app.use(cors());
//Setting the port for express
export const port = process.env.PORT || 3001;

//Here, we set the app to use the JSON Format.
app.use(express.json());

//Here, we set the app to use the URL encoded format.
app.use(express.urlencoded({extended: true}));

//The connection to the database launched here below, we need the models imported here for sync the models and create the tables:

import Connecting from './db.js';
import './models/users.model.js';
Connecting();

// Importing the auth routes for his use
import { auth_routes } from './routes/auth/auth.route.js';
app.use('/auth', auth_routes);

// Importing the users routes for his use
import { users_routes } from './routes/users/users.route.js';
app.use('/users', users_routes);

// Importing the calendar routes for his use
import { calendar_router } from './routes/calendar/calendar.route.js';
app.use('/calendar', calendar_router);


// Setting the swagger description
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API for my app',
    },
}

// Creating a object that contains the definition and the routes
const swaggerOptions = {
    swaggerDefinition,
    apis: ['./src/routes/*.js'],
}

// passing swaggerOptions to swaggerJSDoc like a parameter
const swaggerSpec = swaggerJSDoc(swaggerOptions)

// Setting the swagger route
app.use("/swagger-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", (req, res) => {
    res.status(200).json("Hello! Welcome to my API. You want to know more about me? Visit this link: https://beacons.ai/ahb.62 ");
});
