const mongoose = require('mongoose');
const { NUMBER } = require('sequelize');

const medicamentoSchema = new mongoose.Schema({
    id: Number,
    nombre: String,
    cantidad: Number,
    tipo: String,
    fechaIngreso: String,
    fechaVencimiento: String,
    estado: String,
});

const tratamientoSchema = new mongoose.Schema({
    diagnostico: String,
    codigo: Number,
    duracion: String,
    ultimaActualizacion: String,
});

const voluntarioSchema = new mongoose.Schema({
    nombre: String,
    rut: String,
    direccion: String,
    telefono: String,
    correo: String,
    contraseña: String,
    fechaIngreso: String,
    fechaNacimiento: String,
    observaciones: String,
});

const PerroSchema = new mongoose.Schema({
    nombre: String,
    imagen: String,
    Datos: {
        fechaIngreso : String,
        fechaNacimiento : String,
        esterilizacion :{
            fecha : String,
            lugar : String,
        },
        Adopcion:{
            fecha : String,
            Persona : {
                nombre:String,
                rut : String,
                direccion : String,
                telefono : String,
                correo : String,
                retorno : String,
            },
        },
    },
    Vacunas: {
        vacuna1 : String,
        vacuna2 : String,
        Antirabica : String,
        vacunaAnual : String,
        antiparasitarioInterno : String,
        antiparasitarioExterno : String,
    },
    Tratamientos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tratamiento',
    }],
});

const Perro = mongoose.model('Perro', PerroSchema);
const Tratamiento = mongoose.model('Tratamiento', tratamientoSchema);
const Medicamento = mongoose.model('Medicamento', medicamentoSchema);
const Voluntario = mongoose.model('Voluntario', voluntarioSchema);

module.exports = {Perro, Tratamiento, Medicamento, Voluntario};