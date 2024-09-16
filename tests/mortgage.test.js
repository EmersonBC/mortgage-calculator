const request = require('supertest');
const app = require('../bin/www');

const messages = require('../utils/messages');
const mock = require('./mocks/mortgage.mock');

describe('GET /mortgage/calculate', () => {

  // Success cases

  it('should return 200 if the input are valid', async () => {
    return request(app)
      .get('/mortgage/calculate')
      .send(mock.inputs.validMonthly)
      .expect(200)
      .then((res) => {
        expect(res.statusCode)
          .toBe(200);
      });
  });

  it('should return the correct value for a monthly payment', async () => {
    return request(app)
      .get('/mortgage/calculate')
      .send(mock.inputs.validMonthly)
      .expect(200)
      .then((res) => {
        expect(res.statusCode)
          .toBe(200);
        expect(res.body)
          .toEqual(mock.outputs.validMonthly);
      });
  });

  it('should return the correct value for a bi-weekly payment', async () => {
    return request(app)
      .get('/mortgage/calculate')
      .send(mock.inputs.validBiWeekly)
      .expect(200)
      .then((res) => {
        expect(res.statusCode)
          .toBe(200);
        expect(res.body)
          .toEqual(mock.outputs.validBiWeekly);
      });
  });

  it('should return the correct value for a accelerated bi-weekly payment', async () => {
    return request(app)
      .get('/mortgage/calculate')
      .send(mock.inputs.validAcceleratedBiWeekly)
      .expect(200)
      .then((res) => {
        expect(res.statusCode)
          .toBe(200);
        expect(res.body)
          .toEqual(mock.outputs.validAcceleratedBiWeekly);
      });
  });

  // Error cases

  it('should return error if any input are missing', async () => {
    return request(app)
      .get('/mortgage/calculate')
      .send(mock.inputs.invalidMissingFields)
      .expect(400)
      .then((res) => {
        expect(res.statusCode)
          .toBe(400);
        expect(res.body.error)
          .toBe(messages.error.missing_field);
      });
  });

  it('should return error if the down payment is too low', async () => {
    return request(app)
      .get('/mortgage/calculate')
      .send(mock.inputs.invalidLowDownPayment)
      .expect(400)
      .then((res) => {
        expect(res.statusCode)
          .toBe(400);
        expect(res.body.error)
          .toBe(messages.error.down_payment_too_low);
      });
  });
});
