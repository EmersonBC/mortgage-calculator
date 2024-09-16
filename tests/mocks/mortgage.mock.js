const { paymentSchedules } = require('../../models/mortgage.model');

inputs = {
  validMonthly: {
    'propertyPrice': '1000000',
    'downPayment': '250000',
    'annualInterestRate': '0.05',
    'amortizationPeriod': '30',
    'paymentSchedule': paymentSchedules.monthly
  },
  validBiWeekly: {
    'propertyPrice': '1000000',
    'downPayment': '250000',
    'annualInterestRate': '0.05',
    'amortizationPeriod': '30',
    'paymentSchedule': paymentSchedules.biWeekly
  },
  validAcceleratedBiWeekly: {
    'propertyPrice': '1000000',
    'downPayment': '250000',
    'annualInterestRate': '0.05',
    'amortizationPeriod': '30',
    'paymentSchedule': paymentSchedules.acceleratedBiWeekly
  },
  invalidMissingFields: {
    'propertyPrice': '1000000',
    'amortizationPeriod': '30',
    'paymentSchedule': paymentSchedules.monthly
  },
  invalidLowDownPayment: {
    'propertyPrice': '1000000',
    'downPayment': '20000',
    'annualInterestRate': '0.05',
    'amortizationPeriod': '30',
    'paymentSchedule': paymentSchedules.monthly
  }
};

outputs = {
  validMonthly: {
    'mortgagePayment': '4026.16',
    'paymentSchedule': paymentSchedules.monthly
  },
  validBiWeekly: {
    'mortgagePayment': '1858.23',
    'paymentSchedule': paymentSchedules.biWeekly
  },
  validAcceleratedBiWeekly: {
    'mortgagePayment': '2013.08',
    'paymentSchedule': paymentSchedules.acceleratedBiWeekly
  }
};

module.exports = {
  inputs,
  outputs
};
