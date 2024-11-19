const express = require('express');
const {
    createPet,
    listAllPets,
    listUserPets,
    getPetById,
    updatePet,
    deletePet
} = require('../controllers/petController');
const { autenticarToken } = require('../middleware/auth');
const { validarDueños } = require('../middleware/validateOwners');

const router = express.Router();

router.post('/pets/create', autenticarToken, createPet);
router.get('/pets/listAll', listAllPets);
router.get('/pets/list', autenticarToken, listUserPets);
router.get('/pets/:id/view', getPetById);
router.put('/pets/:id/update', autenticarToken, validarDueños, updatePet);
router.delete('/pets/:id/delete', autenticarToken, deletePet);

module.exports = router;