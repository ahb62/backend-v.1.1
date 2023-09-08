import {Sequelize} from 'sequelize';
export const sequelize = new Sequelize("postgres://default:moR5AQfMxTL6@ep-divine-tree-15188742.us-east-1.postgres.vercel-storage.com:5432/verceldb");

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
const DB_USER = 'default';
const DB_PASSWORD = 'moR5AQfMxTL6';
const DB_HOST = "ep-divine-tree-15188742-pooler.us-east-1.postgres.vercel-storage.com";
const DB_PORT = 5432;
const DB_NAME = 'verceldb';

// Opciones de configuración para Sequelize
const sequelizeOptions = {
  dialect: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
};

export const sequelize = new Sequelize(sequelizeOptions);

async function Connecting() {
  try {
    await sequelize.authenticate().then(async () => {
      console.log("Connection to the database has been established successfully");
      await sequelize.sync();
      console.log("All models are synchronized successfully!");
    });
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
}

export default Connecting;


