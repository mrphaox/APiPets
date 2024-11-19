// Importar dependencias
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config(); // dotenv para crear variables de ambiente para token y db

// Modelos de rutas
const userRoutes = require("./routes/userRoutes");
const petRoutes = require("./routes/petRoutes");

// Crear aplicación
const app = express();
const port = process.env.PORT || 9000;

// Middleware y configuración de rutas
app.use(express.json());  // Middleware para parsear JSON
app.use(cors());  // Habilitar CORS para todas las solicitudes
app.use('/api', userRoutes); // Ruta para los endpoints relacionados con usuarios
app.use('/api', petRoutes);  // Ruta para los endpoints relacionados con mascotas

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conectado a MongoDB Atlas"))
    .catch((error) => console.error("Error al conectar a MongoDB Atlas:", error));

// Manejo de errores
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ mensaje: err.message });
});

// Iniciar servidor
app.listen(port, () => console.log('Servidor escuchando en el puerto', port));