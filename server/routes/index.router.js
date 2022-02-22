const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

router.get('/get/home', ctrlUser.get)

router.post('/register', ctrlUser.register);

router.delete('/delete/:id', ctrlUser.delete);

router.put('/put/:id', ctrlUser.put);

module.exports = router;