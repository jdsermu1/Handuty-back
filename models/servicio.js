const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {categoryValidator} = require("./validator");
const Reserva = require("./reserva");
const Chat = require("./chat");

const servicio = new Schema({
    categoria: {
        type: String,
        required: true,
        validate: [categoryValidator, "No es una categoría valida."]
    },
    calificacion: {
        min: 0,
        max: 5,
        type: Number
    },
    precio: {
        type: Number,
        required: true,
        min:1000
    },
    descripcion: {
        type: String,
        required: true,
        maxlength: 160,
        minlength: 10,
    },
    trabajador: {
        type: Schema.Types.ObjectId,
        ref: "Trabajador",
        required: true
    },

}, {collection: 'Servicios'});

servicio.pre('deleteOne', {document: false, query: true}, function () {
    const servicioId = this.getFilter()["_id"];
    Reserva.deleteMany({servicio: servicioId}).then().catch(err => {
        console.log("Error eliminación servicios trabajador: ", servicioId)
    });
});

module.exports = mongoose.model("Servicio", servicio);