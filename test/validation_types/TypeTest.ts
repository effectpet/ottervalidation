import { describe, it } from 'mocha';
import { deepStrictEqual } from 'assert';
import { OV, OVValidation } from '../../src';

describe('Validation type - Type', () => {
  interface Form {
    username: string,
    birthYear: number,
    accepted_terms: boolean,
  }

  const validation: OVValidation<Form> = {
    username: {
      type: ['string', 'number'],
    },
    birthYear: {
      type: 'number',
    },
    accepted_terms: {
      type: 'boolean',
    },
  };

  describe('With valid types', () => {
    it('should return no errors', () => {
      const form = {
        username: 'some username',
        birthYear: 1991,
        accepted_terms: true,
      };

      const ov = new OV(form, validation);
      const ovResult = ov.validate();
      const expectedResult = {
        object: {
          username: {},
          birthYear: {},
          accepted_terms: {},
        },
      };

      deepStrictEqual(expectedResult, ovResult);
    });
  });
  describe('With invalid types', () => {
    it('should return errors', () => {
      const form = {
        username: true,
        birthYear: '1991',
        accepted_terms: 'yes',
      };

      const ov = new OV(form, validation);
      const ovResult = ov.validate();
      const expectedResult = {
        errors: ['username.type', 'birthYear.type', 'accepted_terms.type'],
        object: {
          username: {
            errors: ['username.type'],
          },
          birthYear: {
            errors: ['birthYear.type'],
          },
          accepted_terms: {
            errors: ['accepted_terms.type'],
          },
        },
      };

      deepStrictEqual(expectedResult, ovResult);
    });
  });
  describe('With missing keys', () => {
    it('should return no errors', () => {
      const form = {} as Form;

      const ov = new OV(form, validation);
      const ovResult = ov.validate();
      const expectedResult = {
        object: {
          username: {},
          birthYear: {},
          accepted_terms: {},
        },
      };

      deepStrictEqual(expectedResult, ovResult);
    });
  });
});
