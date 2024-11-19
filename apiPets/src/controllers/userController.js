const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser  = async (req, res) => {
    try {
        const { nombre, email, contraseña } = req.body;

        // Verificar si el usuario ya está registrado
        const existingUser  = await User.findOne({ email });
        if (existingUser ) {
            return res.status(400).json({ mensaje: 'Lo siento, este correo ya esta registrado' });
        }

        // Si no existe, proceder a crear el nuevo usuario
        const salt = await bcrypt.genSalt(10);
        const contraseñaHash = await bcrypt.hash(contraseña, salt);

        const nuevoUsuario = new User({ nombre, email, contraseña: contraseñaHash });
        const usuarioGuardado = await nuevoUsuario.save();
        
        // Puedes devolver solo el ID o el usuario guardado sin la contraseña
        res.status(201).json({ mensaje: 'Usuario registrado con éxito', usuario: { id: usuarioGuardado._id, nombre: usuarioGuardado.nombre, email: usuarioGuardado.email } });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

const loginUser  = async (req, res) => {
    try {
        const { email, contraseña } = req.body;
        const usuario = await User.findOne({ email });
        if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

        const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!contraseñaValida) return res.status(400).json({ mensaje: 'Contraseña incorrecta' });

        const token = jwt.sign({ _id: usuario._id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: { email: usuario.email, rol: usuario.rol } });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

const updateUser  = async (req, res) => {
    try {
        const { nombre, email } = req.body;
        const usuarioActualizado = await User.findByIdAndUpdate(req.params.id, { nombre, email }, { new: true });
        if (!usuarioActualizado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        res.status(200).json(usuarioActualizado);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

const deleteUser  = async (req, res) => {
    try {
        const usuarioEliminado = await User.findByIdAndDelete(req.params.id);
        if (!usuarioEliminado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        res.status(200).json({ mensaje: 'Usuario eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const usuario = await User.findById(req.params.id);
        if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

const listUsers = async (req, res) => {
    try {
        const usuarios = await User.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

const listAllUsers = async (req, res) => {
    try {
        const usuarios = await User.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

module.exports = {
    registerUser ,
    loginUser ,
    updateUser ,
    deleteUser ,
    getUserById,
    listUsers, 
    listAllUsers
};