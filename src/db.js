import {Sequelize} from 'sequelize';

export const sequelize = new Sequelize('postgres://postgres:root@localhost:5432/monoma');

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