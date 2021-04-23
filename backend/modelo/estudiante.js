// importamos modulo de Mongoose
let mongoose = require("mongoose");
//crear esquema del usuario
let schema = mongoose.Schema;

//Modelamos el esquema
let estudianteSchema = schema({
    nombre: String,
    codigo:String,
    correo: String,
    puntos: Number,
    fechaRegistro: {type: Date, default: Date.now}
    
});
//Exportamos el modelo usuario
module.exports = mongoose.model("estudiante", estudianteSchema);