const mongoose = require("mongoose");
const {dateValidator} = require("./validator")
const Schema = mongoose.Schema;
const Servicio = require("./servicio");
const Chat = require("./chat");


const trabajadorSchema = new Schema({
    nombre: {type: String, required: true, minlength: 1},
    contrasena: {type: String, required: true, minlength: 6},
    correo: {
        type: String, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email' +
        ' address'], required: true, unique: true
    },
    telefono: {type: String, required: true, minlength: 7},
    fechaNacimiento: {type: Date, required: true, validate: [dateValidator, "Debe ser mayor de edad"]},
    cedula: {type: String, required: true, minlength: 7}
}, {collection: 'Trabajadores'});

trabajadorSchema.pre('deleteOne', {document: false, query: true}, function () {
    const trabajadorId = this.getFilter()["_id"];
    Servicio.deleteMany({trabajador: trabajadorId}).then().catch(err => {
        console.log("Error eliminación servicios trabajador: ", trabajadorId)
    });
    Chat.deleteMany({trabajador: trabajadorId}).then().catch(err => {
        console.log("Error eliminación chats trabajador: ", trabajadorId)
    });
});


module.exports = mongoose.model("Trabajador", trabajadorSchema);