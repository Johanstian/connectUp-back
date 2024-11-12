const express = require('express');
const router = express.Router();

const { getProfessions } = require('../controllers/professionController');

router.get('/get-professions', getProfessions);

module.exports = router;