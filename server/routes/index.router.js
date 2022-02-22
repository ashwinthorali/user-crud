const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

router.post('/register', ctrlUser.register);

router.delete('/delete', ctrlUser.delete);

module.exports = router;