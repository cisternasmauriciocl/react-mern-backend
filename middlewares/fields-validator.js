const { response } = require("express");
const { validationResult } = require("express-validator");

const fieldsValidator = (req, res = repsonse, next) => {
  //   manejo de errores

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: "false",
      errors: errors.mapped(),
    });
  }

  next();
};

module.exports = {
  fieldsValidator,
};
