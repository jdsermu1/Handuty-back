var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var dburl = process.env.MONGO_URL
var indexRouter = require('./routes/index');
var reservasRouter = require('./routes/reservas');
var chatsRouter = require('./routes/chat');
var mensajesRouter = require('./routes/mensajes');
var trabajadorRouter = require("./routes/trabajador");
var serviciosRouter = require('./routes/servicios');
var clientesRouter = require('./routes/clientes')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//mongoose.Promise = require("bluebird");

mongoose.connect(dburl, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});


app.use('/', indexRouter);
app.use('/clientes', clientesRouter)
app.use('/reservas', reservasRouter);
app.use('/chats', chatsRouter);
app.use('/trabajadores', trabajadorRouter);
app.use('/mensajes', mensajesRouter)
app.use('/servicios', serviciosRouter);

module.exports = app;
