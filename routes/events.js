// eventrouts***
// api / events;

const { Router } = require("express");
const { check } = require("express-validator");
const { isDate } = require("../helpers/isDate");

const { fieldsValidator } = require("../middlewares/fields-validator");
const router = Router();
const {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const { validarJWT } = require("../middlewares/validar-jwt");

// todas tienen que estar validadas por el jwt
router.use(validarJWT);

// obtener eventos
router.get("/", getEvents);

// crear evento
router.post(
  "/new",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "La fecha es obligatoria").custom(isDate),
    check("end", "La fecha es finalización").custom(isDate),

    fieldsValidator,
  ],
  createEvent
);

// actualizar evento
router.put(
  "/:id",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "La fecha es obligatoria").custom(isDate),
    check("end", "La fecha es finalización").custom(isDate),

    fieldsValidator,
  ],
  updateEvent
);

// eliminar evento
router.delete("/:id", deleteEvent);

module.exports = router;
