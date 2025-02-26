import { Router } from "express";
import { crearEmpresa , listarEmpresa, actulizarEmpresa, listarEmpresaDeAalaZ, listarEmpresaDeZalaA, listarCategoriaDeAalaZ, listarAñoDeAalaZ } from "./empresa.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("categoria", "La categoría es obligatoria").not().isEmpty(),
        check("impacto", "La descripcion es obligatoria").not().isEmpty(),
        check("año", "La año es obligatoria").not().isEmpty(),
        validarCampos
    ],
    crearEmpresa
)

router.get("/", listarEmpresa);

router.put(
    "/:id",
    [
        validarJWT
    ],
    actulizarEmpresa

)

router.get("/AZ/", listarEmpresaDeAalaZ);

router.get("/ZA/", listarEmpresaDeZalaA);

router.get("/categoriaAZ/", listarCategoriaDeAalaZ);

router.get("/ayoAZ/", listarAñoDeAalaZ);

export default router;