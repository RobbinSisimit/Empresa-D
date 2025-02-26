import mongoose from "mongoose";

const EmpresaShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "El Nombre Es Obligatorio"]
    },
    categoria: {
        type: String,
        required: [true, "El Caregoria Es Obligatorio"]
    },
    impacto: {
        type: String,
        required: [true, "El impacto Es Obligatorio"]
    },
    año: {
        type: Number,
        required: [true, "El año Es Obligatorio"]
    },
    status: {   
        type: Boolean,
        default: true
    }
});

export default mongoose.model("Empresa", EmpresaShema);