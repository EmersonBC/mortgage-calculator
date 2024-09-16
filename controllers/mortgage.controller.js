const mortgageService = require('../services/mortgage.service');

const calculateMortgage = async (req, res) => {
  const result = mortgageService.calculateMortgage(req.body);

  res.json(result);
};

module.exports = {
  calculateMortgage
};
