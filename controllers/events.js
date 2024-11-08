const { response } = require("express");
const Evento = require("../models/Evento");

const getEvents = async (req, res = response) => {
  const eventos = await Evento.find().populate("user", "name");

  res.status(200).json({
    ok: true,
    eventos,
  });
};

const createEvent = async (req, res = response) => {
  const evento = new Evento(req.body);

  try {
    evento.user = req.uid;

    const eventoGuardado = await evento.save();

    res.status(200).json({
      ok: true,
      evento: eventoGuardado,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

const updateEvent = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "evento no existe con ese id",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "no tiene privilegios de editar este evento",
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );

    res.status(200).json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

const deleteEvent = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "evento no existe con ese id",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "no tiene privilegios para eliminar este evento",
      });
    }

    await Evento.findByIdAndDelete(eventoId);

    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

module.exports = {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
};
