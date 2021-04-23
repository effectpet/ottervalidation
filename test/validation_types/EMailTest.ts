import { describe, it } from 'mocha';
import { deepStrictEqual } from 'assert';
import { OV, OVValidation } from '../../src';

describe('Validation type - EMail', () => {
  interface Form {
    email: string,
  }

  const validation: OVValidation<Form> = {
    email: {
      email: true,
    },
  };

  describe('With valid value', () => {
    it('should return no errors', () => {
      const form = {
        email: 'some@mail.com',
      };

      const ov = new OV(form, validation);
      const ovResult = ov.validate();
      const expectedResult = {
        object: {
          email: {},
        },
      };

      deepStrictEqual(expectedResult, ovResult);
    });
  });
  describe('With invalid value', () => {
    it('should return errors', () => {
      const form = {
        email: 'invalid email',
      };

      const ov = new OV(form, validation);
      const ovResult = ov.validate();
      const expectedResult = {
        errors: ['email.email'],
        object: {
          email: {
            errors: ['email.email'],
          },
        },
      };

      deepStrictEqual(expectedResult, ovResult);
    });
  });
  describe('With wrong type', () => {
    it('should return no errors', () => {
      const form = {
        email: 123,
      };

      const ov = new OV(form, validation);
      const ovResult = ov.validate();
      const expectedResult = {
        object: {
          email: {},
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
          email: {},
        },
      };

      deepStrictEqual(expectedResult, ovResult);
    });
  });
});
