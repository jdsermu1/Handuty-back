const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Mensaje = require("./mensaje");

const chat = new Schema({
    fecha: {
        type: Date,
        required: true
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: "Cliente",
        required: true
    },
    trabajador: {
        type: Schema.Types.ObjectId,
        ref: "Trabajador",
        required: true
    }
}, {
    versionKey: false,
    collection: 'Chats'
});

chat.pre('deleteOne', {document: false, query: true}, function () {
    const chatId = this.getFilter()["_id"];
    Mensaje.deleteMany({chat: chatId}).then().catch(err => {
        console.log("Error eliminación mensajes chat: ", chatId)
    });

});

module.exports = mongoose.model("Chat", chat);