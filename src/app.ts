import express, { Application, Request, Response }  from 'express';
import dotenvFlow from 'dotenv-flow';
import{ testConnection } from './repository/database';

import routes from './routes';
import { disconnect } from 'node:cluster';


dotenvFlow.config();

// Create Express application
const app: Application = express();

app.use("/api", routes);




export function startServer() {

    testConnection();

    //connect();
    //disconnect();
    //test db connection

    const PORT: number = parseInt (process.env.PORT as string) || 4000;
    app.listen(PORT, function() {
        console.log("Server is running o port:" + PORT);
    })
}
