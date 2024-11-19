const express = require('express');
const {
    registerUser ,
    loginUser ,
    updateUser ,
    deleteUser ,
    getUserById,
    listUsers
} = require('../controllers/userController');
const { autenticarToken } = require('../middleware/auth');

const router = express.Router();

router.post('/users/register', registerUser );
router.post('/login', loginUser );
router.put('/users/:id/update', autenticarToken, updateUser );
router.delete('/users/:id/delete', autenticarToken, deleteUser );
router.get('/users/:id/view', autenticarToken, getUserById);
router.get('/users/list', autenticarToken, listUsers);

module.exports = router;