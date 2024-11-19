const jwt = require("jsonwebtoken");
const User = require("../models/user");

const autenticarToken = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ mensaje: "Acceso denegado" });

  try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await User.findById(verificado._id);
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    req.user = usuario; // Guardar el usuario completo, incluyendo el rol
    next(); // Pasar al siguiente middleware
  } catch (error) {
    res.status(400).json({ mensaje: "Token no válido" });
  }
};

module.exports = { autenticarToken };
