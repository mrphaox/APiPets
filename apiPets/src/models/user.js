const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contraseña: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    enum: ['usuario', 'admin'], // Define los roles posibles
    default: 'usuario', // Valor predeterminado para nuevos usuarios
  }
});

module.exports = mongoose.model("User", userSchema);
