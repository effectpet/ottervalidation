import { describe, it } from 'mocha';
import { deepStrictEqual } from 'assert';
import { OV, OVValidation } from '../../src';

describe('Validation type - Required', () => {
  interface Form {
    username: string,
    password: string,
  }

  const validation: OVValidation<Form> = {
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
        object: {
          username: {},
          password: {},
        },
      };

      deepStrictEqual(expectedResult, ovResult);
    });
  });
  describe('With missing keys', () => {
    it('should return errors', () => {
      const form = {} as Form;

      const ov = new OV(form, validation);
      const ovResult = ov.validate();
      const expectedResult = {
        errors: ['username.required'],
        object: {
          username: { errors: ['username.required'] },
          password: {},
        },
      };

      deepStrictEqual(expectedResult, ovResult);
    });
  });
});
