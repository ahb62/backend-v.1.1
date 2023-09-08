import {Sequelize} from 'sequelize';

export const sequelize = new Sequelize("postgres://default:moR5AQfMxTL6@ep-divine-tree-15188742.us-east-1.postgres.vercel-storage.com:5432/verceldb");

async function Connecting() {
    try{
        await sequelize.authenticate().then(async () => {
            console.log("Connection to the database has been established successfully");
            await sequelize.sync();
            console.log(("All models are syncronized successfully!"));
        })
    } catch(error) {
        console.error("Unable to connect to the database: ", error);

    }
}
export default Connecting;
