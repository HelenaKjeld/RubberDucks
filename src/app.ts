import express, { Application, Request, Response }  from 'express';
import dotenvFlow from 'dotenv-flow';
import{ testConnection } from './repository/database';

import routes from './routes';
import { disconnect } from 'node:cluster';
import cors from 'cors';


dotenvFlow.config();

// Create Express application
const app: Application = express();




export function startServer() {

    app.use(cors({

  // Allow request from any origin
  origin: "*", // localhost and render is allowed at the same time

  // allow HTTP methods
  methods: ["GET", "PUT", "POST", "DELETE"],

  // allow headers
  allowedHeaders: ['auth-token', 'Origin', 'X-Requested-Width', 'Content-Type', 'Accept'],

  // allow credentials
  credentials:true
}))
    

    app.use(express.json());

    app.use("/api", routes);

    testConnection();

    //connect();
    //disconnect();
    //test db connection

    const PORT: number = parseInt (process.env.PORT as string) || 4000;
    app.listen(PORT, function() {
        console.log("Server is running o port:" + PORT);
    })
}
