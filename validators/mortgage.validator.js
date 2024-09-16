const messages = require('../utils/messages');

function validateCalculate(req, res, next) {
  if (!req.body.propertyPrice || !req.body.downPayment || !req.body.annualInterestRate || !req.body.amortizationPeriod || !req.body.paymentSchedule) {
    return res.status(400)
      .json({ error: messages.error.missing_field });
  }

  if (req.body.amortizationPeriod < 5 || req.body.amortizationPeriod > 30) {
    return res.status(400)
      .json({ error: messages.error.invalid_amortization_period });
  }

  if (req.body.downPayment < req.body.propertyPrice * 0.05) {
    return res.status(400)
      .json({ error: messages.error.down_payment_too_low });
  }

  next();
}

module.exports = { validateCalculate };
