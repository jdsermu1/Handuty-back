const express = require("express");
const ChatModel = require("../models/chat");
const ClienteModel = require("../models/cliente");
const TrabajadorModel = require("../models/trabajador");
const Mensaje = require("../models/mensaje");
const router = express.Router();

router.get("/", (req, res) => {
    ChatModel.find({}, (err, chats) => {
        err ? res.status(400).send(err) : res.send(chats);
    });
});

router.get("/:chatId", (req, res) => {
    ChatModel.findById(req.params.chatId, (err, chat) => {
        if (err) return res.status(400).send(err);
        else if (!chat) return res.sendStatus(404);
        res.send(chat);
    });
});

router.post("/", (req, res) => {
    ClienteModel.findById(req.body.cliente, (err, cliente) => {
        if (err) return res.status(400).send(err);
        if (cliente != null) {
            TrabajadorModel.findById(req.body.trabajador, (err, trabajador) => {
                if (err) return res.status(400).send(err);
                if (trabajador != null) {
                    ChatModel.create(req.body, (err, chat) => {
                        err ? res.status(400).send(err) : res.status(201).send(chat);
                    });
                } else {
                    res.status(404).send("Trabajador no encontrado.")
                }
            });
        } else {
            res.status(404).send("Cliente no encontrado.")
        }
    });

});

router.delete("/:chatId", (req, res) => {
    ChatModel.deleteOne({_id: req.params.chatId}, (err, resp) => {
        if (err) {
            res.status(400).send(err);
        } else {
            if (resp.n === 0) return res.sendStatus(404);
            res.sendStatus(204);
        }
    });
});

router.patch("/:chatId", (req, res) => {
    ChatModel.findOneAndUpdate({_id: req.params.chatId}, {$set: req.body}, {runValidators: true}, (err) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.sendStatus(200);
        }
    });
});


router.put("/:chatId", (req, res) => {
    ChatModel.replaceOne({_id: req.params.chatId}, req.body, {runValidators: true}, (err, resp) => {
        if (err) {
            res.status(400).send(err);
        } else {
            if (resp.nModified === 0) return res.sendStatus(404);
            res.sendStatus(200);
        }
    });
});


router.get("/:id/mensajes", (req, res) => {
    Mensaje.find({chat: req.params.id}).then(mensajes => {
        res.send(mensajes);
    }).catch(err => {
        res.status(400).send(err)
    });
});

module.exports = router;