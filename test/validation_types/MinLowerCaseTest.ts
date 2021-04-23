import { describe, it } from 'mocha';
import { deepStrictEqual } from 'assert';
import { OV, OVValidation } from '../../src';

describe('Validation type - MinLowerCase', () => {
  interface Form {
    username: string
  }

  const validation: OVValidation<Form> = {
    username: {
      minLowerCase: 1,
    },
  };

  describe('With valid value', () => {
    it('should return no errors', () => {
      const form = {
        username: 'username',
      };

      const ov = new OV(form, validation);
      const ovResult = ov.validate();
      const expectedResult = {
        object: {
          username: {},
        },
      };

      deepStrictEqual(expectedResult, ovResult);
    });
  });
  describe('With invalid value', () => {
    it('should return errors', () => {
      const form = {
        username: 'USERNAME',
      };

      const ov = new OV(form, validation);
      const ovResult = ov.validate();
      const expectedResult = {
        errors: ['username.minlowercase'],
        object: {
          username: {
            errors: ['username.minlowercase'],
          },
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
        object: {
          username: {},
        },
      };

      deepStrictEqual(expectedResult, ovResult);
    });
  });
  describe('With missing value', () => {
    it('should return no errors', () => {
      const form = {} as Form;

      const ov = new OV(form, validation);
      const ovResult = ov.validate();
      const expectedResult = {
        object: {
          username: {},
        },
      };

      deepStrictEqual(expectedResult, ovResult);
    });
  });
});
