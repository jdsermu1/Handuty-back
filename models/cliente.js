const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {dateValidator} = require("./validator")
const Reserva = require("./reserva");
const Chat = require("./chat");
const cliente = new Schema({
    ciudad: {
        type: String,
        required: true,
        minlength: 1
    },
    direccion: {
        type: String,
        required: true,
        minlength: 1
    },
    nombre: {
        type: String,
        required: true,
        minlength: 1
    },
    contrasena: {
        type: String,
        required: true,
        minlength: 6
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    telefono: {
        type: String,
        required: true
    },
    fechaNacimiento: {
        type: Date,
        required: true,
        validate: [dateValidator, "Debe ser mayor de edad"]
    },
    cedula: {
        type: String,
        required: true,
        minlength: 7
    }
}, {
    versionKey: false,
    collection: 'Clientes'
});

cliente.pre('deleteOne', {document: false, query: true}, function () {
    const clienteId = this.getFilter()["_id"];
    Reserva.deleteMany({cliente: clienteId}).then().catch(err => {
        console.log("Error eliminación reservas cliente: ", clienteId)
    });
    Chat.deleteMany({cliente: clienteId}).then().catch(err => {
        console.log("Error eliminación chats cliente: ", clienteId)
    });
});

module.exports = mongoose.model("Cliente", cliente)