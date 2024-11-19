const User = require("../models/user");
const express = require('express');
const Pet = require('../models/pet'); // Asegúrate de que la ruta sea correcta
const { autenticarToken } = require('../middleware/auth');

const validarDueños = async (req, res, next) => {
  try {
    if (!req.body.owners || !Array.isArray(req.body.owners) || req.body.owners.length === 0) {
      return res.status(400).json({ mensaje: 'Se requiere al menos un ID de dueño' });
    }

    const dueños = await User.find({ _id: { $in: req.body.owners } });
    if (dueños.length !== req.body.owners.length) {
      return res.status(404).json({ mensaje: 'Uno o más dueños no fueron encontrados' });
    }
    next();
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

module.exports = { validarDueños };