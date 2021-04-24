import { describe, it } from 'mocha';
import { deepStrictEqual } from 'assert';
import { OV, OVValidation } from '../../src';

describe('ValidateKey Test', () => {
  interface Form {
    username: string,
  }

  const validation: OVValidation<Form> = {
    username: {
      type: 'string',
    },
  };

  describe('With valid value', () => {
    it('should return no errors', () => {
      const form = {
        username: 'username',
      };

      const ov = new OV(form, validation);
      const ovResult = ov.validateKey('username');
      const expectedResult = {};

      deepStrictEqual(expectedResult, ovResult);
    });
  });
  describe('With invalid value', () => {
    it('should return errors', () => {
      const form = {
        username: 123,
      };

      const ov = new OV(form, validation);
      const ovResult = ov.validateKey('username');
      const expectedResult = {
        errors: ['username.type'],
      };

      deepStrictEqual(expectedResult, ovResult);
    });
  });
});
