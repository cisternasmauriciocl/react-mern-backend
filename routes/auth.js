//  rutas de usuarios // auth
// host + /api/auth

const { Router } = require("express");
const { check } = require("express-validator");
const { fieldsValidator } = require("../middlewares/fields-validator");
const router = Router();
const {
  createUser,
  loginUser,
  revalidarToken,
} = require("../controllers/auth");
const { validarJWT } = require("../middlewares/validar-jwt");

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña debe ser de min 6 caracteres").isLength({
      min: 6,
    }),
    fieldsValidator,
  ],

  createUser
);

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña debe ser de min 6 caracteres").isLength({
      min: 6,
    }),
    fieldsValidator,
  ],
  loginUser
);

router.get("/renew", validarJWT, revalidarToken);

module.exports = router;
