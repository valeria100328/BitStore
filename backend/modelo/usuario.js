// Inportar modulo de Mongoose
let mongoose = require("mongoose");
//crear esquema del usuario
let Schema = mongoose.Schema;

//Modelamos el esquema
let usuarioSchema = Schema({
    nombres:String,
    apellidos: String,
    edad: Number,
    correo: String,
    pass: String,
    rol: String,
    fechaRegistro: {type: Date, default: Date.now}
});

//Exportamos el modelo usuario
module.exports = mongoose.model("usuario",usuarioSchema);