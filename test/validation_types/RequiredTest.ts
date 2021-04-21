import { describe, it } from 'mocha';
import { deepStrictEqual } from 'assert';
import { OV, OVValidation } from '../../src';

describe('Validation type - Required', () => {
  const validation: OVValidation = {
    username: {
      required: true,
    },
    password: {
    },
  };

  describe('With existing keys', () => {
    it('should return no errors', () => {
      const form = {
        username: 'some username',
        password: 'some password',
        invalidKey: 'invalid value',
      };

      const ov = new OV(form, validation);
      const ovResult = ov.validate();
      const expectedResult = {
        username: {},
        password: {},
      };

      deepStrictEqual(expectedResult, ovResult);
    });
  });
  describe('With missing keys', () => {
    it('should return errors', () => {
      const form = {
      };

      const ov = new OV(form, validation);
      const ovResult = ov.validate();
      const expectedResult = {
        errors: ['username.required'],
        username: { errors: ['username.required'] },
        password: {},
      };

      deepStrictEqual(expectedResult, ovResult);
    });
  });
});
