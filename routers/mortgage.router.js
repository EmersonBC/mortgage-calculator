const express = require('express');

const mortgageController = require('../controllers/mortgage.controller');
const mortgageValidator = require('../validators/mortgage.validator');

const router = express.Router();

router.get('/calculate', mortgageValidator.validateCalculate, mortgageController.calculateMortgage);

module.exports = router;
