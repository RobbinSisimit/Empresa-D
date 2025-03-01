import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import XLSX from "xlsx";
import Empresa from './empresa.model.js';

export const crearEmpresa = async (request, res) => {
    try{
        const { name, categoria,impacto,año} = request.body;
        const empresa = new Empresa({name,categoria,impacto ,año});
        await empresa.save();

        res.status(201).json({
            success: true,
            message: "Empresa creada :)",
            empresa
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Error al crear la empresa :(",
            error
        })
    }
};

export const listarEmpresa = async (req, res) =>{
    try{
        const empresas = await Empresa.find({status: true});
        res.status(200).json({
            success: true,
            empresas
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Error al obtener Empresa :(",
            error
        });
    }
};

export const actulizarEmpresa = async (req, res = response) =>{
    try{
        const { id } = req.params;
        const { ...data } = req.body;

        const empresa = await Empresa.findById(id);

        if (!empresa) {
            return res.status(404).json({
                success: false,
                msg: "Empresa no encontrada"
            });
        }

        Object.assign(empresa, data);

        await empresa.save();

        res.status(200).json({
            success:true,
            msg:'EmpresaActualizada :D',
            empresa
        })
    }catch(error){
        res.status(500).json({
            success: false,
            msg: "Error Al Actualizar empresa",
            error
        });
    }
}

export const listarEmpresaDeAalaZ = async (req, res) => {
    try {
        const empresas = await Empresa.find().sort({ name: 1 });
 
        res.status(200).json({
            success: true,
            empresas
        });
 
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al listar las empresas de A-Z",
            error
        });
    }
};

export const listarEmpresaDeZalaA = async (req, res) => {
    try {
        const empresas = await Empresa.find().sort({ name: -1 });
 
        res.status(200).json({
            success: true,
            empresas
        });
 
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al listar las empresas de Z-A",
            error
        });
    }
};

export const listarCategoriaDeAalaZ = async (req, res) => {
    try {
        const empresas = await Empresa.find().sort({ categoria: 1 });
 
        res.status(200).json({
            success: true,
            empresas
        });
 
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al listar las empresas por categorias de la A-Z",
            error
        });
    }
};

export const listarAñoDeAalaZ = async (req, res) => {
    try {
        const empresas = await Empresa.find().sort({ año: 1 });
 
        res.status(200).json({
            success: true,
            empresas
        });
 
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al listar las empresas por año ",
            error
        });
    }
};

export const crearEmpresasXLSX = async (req, res) => {
    try {
        const empresas = await Empresa.find();
        if (!empresas.length) {
            return res.status(404).json({ success: false, message: "No hay empresas disponibles." });
        }
        const wb = XLSX.utils.book_new();
        const empresasData = empresas.map(empresa => {
            const data = empresa.toObject();
            return {...data,Status: empresa.status ? "Activo" : "Inactivo"};
        });

        
        XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(empresasData), "Empresas");

        const folderPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../../ReportesExcel");
        await fs.promises.mkdir(folderPath, { recursive: true });

        const filePath = path.join(folderPath, "empresas.xlsx");
        await fs.promises.writeFile(filePath, XLSX.write(wb, { bookType: "xlsx", type: "buffer" }));

        res.status(200).json({ success: true, message: "Archivo Excel generado con éxito.", filePath });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al generar el archivo Excel", error });
    }const wb = XLSX.utils.book_new();
};
