import express, { Application } from "express";
import cors from 'cors';


import userRoutes from '../routes/usuariosRoutes';
import db from "../db/connection";

class Server {
  private app: Application;
  private port: string;
  private apiPaths={
      usuarios: '/api/usuarios',
  }
  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  // conectar base de datos
  async dbConnection(){
    try {
      await db.authenticate();
      console.log("Database online");
      
    } catch (error : any) {
      throw new Error(error);
    }
  }

  middlewares(){
    // CORS
    this.app.use(cors());

    //Lectura Body Parseo
    this.app.use(express.json());

    // public 
    this.app.use(express.static( 'public'));
  }

  routes (){
    this.app.use(this.apiPaths.usuarios, userRoutes)
  }

  listen(){
    this.app.listen(this.port,()=>{
        console.log("listening on port " + this.port);
    })
  }

}

export default Server;
