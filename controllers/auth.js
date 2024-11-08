const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");
const { generarJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({
      email,
    });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya existe con ese correo",
      });
    }

    usuario = new Usuario(req.body);

    // encriptar contraseña

    const salt = bcrypt.genSaltSync();

    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    // generar jwt
    const token = await generarJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: "true",
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({
      email,
    });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe con ese correo",
      });
    }

    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "contraseña incorrecta",
      });
    }

    // generar jwt

    const token = await generarJWT(usuario.id, usuario.name);

    res.json({
      ok: "true",
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const revalidarToken = async (req, res = response) => {
  const { uid, name } = req;

  // generar nuevo token

  const token = await generarJWT(uid, name);

  res.json({
    ok: "true",
    uid,
    name,
    token,
  });
};

module.exports = {
  createUser,
  loginUser,
  revalidarToken,
};
