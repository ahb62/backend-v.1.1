import {app, port} from './app.js';
// Here, we launch the app on the port 3000. The app.listen() method is a method of the express object that launches the server.
app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
});
 // this file is needed for charge, launch and run the app