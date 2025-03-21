'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import limiter from '../src/middlewares/validar-cant-peticiones.js'
import authRoutes from '../src/auth/auth.routes.js';
import authUsers from '../src/users/user.routes.js';
import authEmpresa from '../src/empresa/empresa.routes.js'

import User from '../src/users/user.model.js'
import { hash } from "argon2";

const configurarMiddlewares = (app) => {
    app.use(express.urlencoded({extended: false}));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
}

const configurarRutas = (app) =>{
    app.use("/Empresa/v1/auth", authRoutes);
    app.use("/Empresa/v1/users",authUsers);
    app.use("/Empresa/v1/empresa",authEmpresa);
}

const conectarDB = async () => {
    try {
        await dbConnection();
        console.log("Conexion Exitosa Con La Base De Datos");
    } catch (error) {
        console.log("Error Al Conectar Con La Base De Datos", error);
    }
}

const crearAdmin = async () => {
    try {
        const adminastradorExistente = await User.findOne({ role: "ADMIN_ROLE" });

        if (!adminastradorExistente) {
            const passwordEncriptada = await hash("Admin123");

            const admin = new User({
                name: "Admin",
                username: "admin",
                email: "admin@gmail.com",
                phone: "123456789",
                password: passwordEncriptada,
                role: "ADMIN_ROLE"
            });

            await admin.save();
            console.log("Administrador creado exitosamente.:p");
        } else {
            console.log("El administrador ya existe.:P");
        }
    } catch (error) {
        console.error("Error al crear el administrador:", error);
    }
};

export const iniciarServidor = async () => {
    const app = express();
    const port = process.env.PORT || 3010;

    await conectarDB();
    await crearAdmin();
    configurarMiddlewares(app);
    configurarRutas(app);

    app.listen(port, () => {
        console.log(`Server Running On Port ${port}`);
    });
}