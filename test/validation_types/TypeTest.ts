import { describe, it } from 'mocha';
import { deepStrictEqual } from 'assert';
import { OV, OVValidation } from '../../src';

describe('Validation type - Type', () => {
  const validation: OVValidation = {
    username: {
      type: 'string',
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
        username: {},
        birthYear: {},
        accepted_terms: {},
      };

      deepStrictEqual(expectedResult, ovResult);
    });
  });
  describe('With invalid types', () => {
    it('should return errors', () => {
      const form = {
        username: 1337,
        birthYear: '1991',
        accepted_terms: 'yes',
      };

      const ov = new OV(form, validation);
      const ovResult = ov.validate();
      const expectedResult = {
        errors: ['username.type', 'birthYear.type', 'accepted_terms.type'],
        username: {
          errors: ['username.type'],
        },
        birthYear: {
          errors: ['birthYear.type'],
        },
        accepted_terms: {
          errors: ['accepted_terms.type'],
        },
      };

      deepStrictEqual(expectedResult, ovResult);
    });
  });
  describe('With missing keys', () => {
    it('should return no errors', () => {
      const form = {};

      const ov = new OV(form, validation);
      const ovResult = ov.validate();
      const expectedResult = {
        username: {},
        birthYear: {},
        accepted_terms: {},
      };

      deepStrictEqual(expectedResult, ovResult);
    });
  });
});
