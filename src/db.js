import { Sequelize } from "sequelize";

// async function Connecting() {
//     try{
//         await sequelize.authenticate().then(async () => {
//             console.log("Connection to the database has been established successfully");
//             await sequelize.sync();
//             console.log(("All models are syncronized successfully!"));
//         })
//     } catch(error) {
//         console.error("Unable to connect to the database: ", error);

//     }
// }
// export default Connecting;
// Variables para almacenar los datos de la base de datos
const DB_USER = "default";
const DB_PASSWORD = "7O6ZaBQVcUAT";
const DB_HOST = "ep-icy-thunder-37500617-pooler.us-east-1.postgres.vercel-storage.com"
const DB_PORT = 5432;
const DB_NAME = "verceldb";




// Opciones de configuración para Sequelize
const sequelizeOptions = {
	dialect: "postgres",
	host: DB_HOST,
	port: DB_PORT,
	username: DB_USER,
	password: DB_PASSWORD,
	database: DB_NAME,
	ssl: true,
	dialectOptions: {
		ssl: {
			require: true,
		},
	},
};

export const sequelize = new Sequelize(sequelizeOptions);

async function Connecting() {
	try {
		await sequelize.authenticate().then(async () => {
			console.log(
				"Connection to the database has been established successfully"
			);
			await sequelize.sync();
			console.log("All models are synchronized successfully!");
		});
	} catch (error) {
		console.error("Unable to connect to the database: ", error);
	}
}

export default Connecting;
