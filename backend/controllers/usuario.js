//variable donde se importa el modulo usuario
let Usuario = require("../modelo/usuario");
//Variable para importar la libreria encriptar pass
let bcrypt = require("bcrypt-nodejs");

// Funcion que registra un usuario
const registrarUsuario = (req, res) => {
  // Sacamos los parametros del body del JSON (viene en la API)
  let params = req.body;
  //utilizamos el modelo usuario (pero limpio)
  let usuario = new Usuario();
  // Validamos el pass para encriptarlo
  if (params.pass) {
    // Usamos bcrypy para encriptar el pass
    bcrypt.hash(params.pass, null, null, function (err, hash) {
      //si se encripta la contraseña
      if (hash) {
        usuario.nombres = params.nombres;
        usuario.apellidos = params.apellidos;
        usuario.edad = params.edad;
        usuario.correo = params.correo;
        usuario.pass = hash;
        usuario.rol = params.rol;
        //enviamos al modelo para registrar en MongoDB
        usuario.save((err, saveUsuario) => {
          if (err) {
            // Si hay un error devolvemos:
            res.status(500).send({ err: "No se registro el usuario" });
          } else {
            // Si el proceso se completo
            res.status(200).send({ usuario: saveUsuario });
          }
        });
      } else {
        //Damos respuesta al error de encriptacion si lo hay
        res
          .status(400)
          .send({ err: "no se encripto el pass, y no se registro usuario" });
      }
    });
  } else {
    //validacion de datos json
    res.status(405).send({ err: "No se guardo ningun dato" });
  }
};
//login
const login = (req, res) =>{
  // Variable para los parametros que llegan
  let params = req.body;
  //Buscamos el usuario en DB
  Usuario.findOne({correo: params.correo}, (err, datosUsuario) => {
    if (err) {
      res.status(500).send({ mensaje: "Error del servidor"});
    } else {
      if (datosUsuario) {
        bcrypt.compare(params.pass, datosUsuario.pass, function(err, confirm) {
              if (confirm) {
                if (params.getToken) {
                    res.status(200).send({Usuario: datosUsuario});
                } else {
                 res.status(200).send({Usuario: datosUsuario, mensaje: "Sin token"});
                }
              } else {
                res.status(401).send({mensaje: "correo o password incorrectos"});
              }
           } );
      } else {
        res.status(401).send({mensaje: "correo o password incorrectos"}); 
      }
    }
  });
};

// Exportamos el usuario
module.exports = {
  registrarUsuario,
  login,
};
