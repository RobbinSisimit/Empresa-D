
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

        const empresa = await Empresa.findByIdAndUpdate(id, {data}, {new:true});

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


