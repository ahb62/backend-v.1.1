import {Sequelize} from 'sequelize';

export const sequelize = new Sequelize('postgresql://postgres:mVpCf7vP1wHCONk8FmA2@containers-us-west-138.railway.app:7880/railway');

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