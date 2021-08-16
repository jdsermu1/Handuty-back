const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mensaje = new Schema({
    contenido: {
        type: String,
        required: true,
        minlength: 1
    },
    trabajador: {
        type: Boolean,
        required: true
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: "Chat",
        required: true
    }

}, {
    timestamps: true,
    versionKey: false,
    collection: 'Mensajes'
});


module.exports = mongoose.model("Mensaje", mensaje);
