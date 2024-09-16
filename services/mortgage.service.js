const messages = require('../utils/messages');
const { paymentSchedules } = require('../models/mortgage.model');

function calculateMortgage(params) {
  const minimumDownPayment = params.propertyPrice * 0.05;

  if (params.downPayment < minimumDownPayment) {
    return { error: messages.error.down_payment_too_low };
  }

  let cmhcInsurance = 0;
  const downPaymentPercentage = params.downPayment / params.propertyPrice;

  if (downPaymentPercentage < 0.20) {
    const mortgageAmount = params.propertyPrice - params.downPayment;
    cmhcInsurance = mortgageAmount * getCmhcPercentage(downPaymentPercentage);
  }

  const principal = params.propertyPrice - params.downPayment + cmhcInsurance;

  const numPaymentsPerYear = 12;//getNumPaymentsPerYear(params.paymentSchedule);

  const totalPayments = 12 * params.amortizationPeriod;
  const ratePerPeriod = params.annualInterestRate / numPaymentsPerYear;

  const monthlyPayment = principal *
    (ratePerPeriod * Math.pow(1 + ratePerPeriod, totalPayments) /
      (Math.pow(1 + ratePerPeriod, totalPayments) - 1));

  const paymentBySchedule = calculatePaymentSchedule(monthlyPayment, params.paymentSchedule);

  return {
    mortgagePayment: paymentBySchedule.toFixed(2),
    paymentSchedule: params.paymentSchedule
  };
}

function getCmhcPercentage(percentage) {
  switch (true) {
    case percentage < 0.1:
      return 0.04;
    case percentage < 0.15:
      return 0.031;
    default:
      return 0.028;
  }
}

function calculatePaymentSchedule(monthlyPayment, schedule) {
  if (schedule === paymentSchedules.biWeekly) {
    return monthlyPayment * 12 / 26;
  }

  if (schedule === paymentSchedules.acceleratedBiWeekly) {
    return monthlyPayment / 2;
  }

  return monthlyPayment;
}

module.exports = {
  calculateMortgage
};
