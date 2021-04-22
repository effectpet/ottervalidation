import { describe, it } from 'mocha';
import { deepStrictEqual } from 'assert';
import { OV, OVValidation } from '../../src';

describe('Validation type - Regex', () => {
  const validation: OVValidation = {
    username: {
      regex: /^[a-zA-Z0-9]*$/,
    },
  };

  describe('With valid value', () => {
    it('should return no errors', () => {
      const form = {
        username: 'ValidUsername1',
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
        username: 'Invalid Username1',
      };

      const ov = new OV(form, validation);
      const ovResult = ov.validate();
      const expectedResult = {
        errors: ['username.regex'],
        username: {
          errors: ['username.regex'],
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
  describe('With missing key', () => {
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
