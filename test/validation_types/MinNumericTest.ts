import { describe, it } from 'mocha';
import { deepStrictEqual } from 'assert';
import { OV, OVValidation } from '../../src';

describe('Validation type - MinNumericTest', () => {
  const validation: OVValidation = {
    username: {
      minNumeric: 1,
    },
  };

  describe('With valid value', () => {
    it('should return no errors', () => {
      const form = {
        username: 'username1',
      };

      const ov = new OV(form, validation);
      const ovResult = ov.validate();
      const expectedResult = {
        username: {},
      };

      deepStrictEqual(expectedResult, ovResult);
    });
  });
  describe('With invalid value', () => {
    it('should return errors', () => {
      const form = {
        username: 'username',
      };

      const ov = new OV(form, validation);
      const ovResult = ov.validate();
      const expectedResult = {
        errors: ['username.minnumeric'],
        username: {
          errors: ['username.minnumeric'],
        },
      };

      deepStrictEqual(expectedResult, ovResult);
    });
  });
  describe('With wrong type', () => {
    it('should return no errors', () => {
      const form = {
        username: 123,
      };

      const ov = new OV(form, validation);
      const ovResult = ov.validate();
      const expectedResult = {
        username: {},
      };

      deepStrictEqual(expectedResult, ovResult);
    });
  });
  describe('With missing value', () => {
    it('should return no errors', () => {
      const form = {};

      const ov = new OV(form, validation);
      const ovResult = ov.validate();
      const expectedResult = {
        username: {},
      };

      deepStrictEqual(expectedResult, ovResult);
    });
  });
});
