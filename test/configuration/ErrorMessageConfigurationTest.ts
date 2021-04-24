import { describe, it } from 'mocha';
import { deepStrictEqual } from 'assert';
import { OV, OVConfiguration, OVValidation } from '../../src';

describe('Configuration - ErrorMessage', () => {
  interface Form {
    username: string,
    password: string,
  }

  const validation: OVValidation<Form> = {
    username: {
      required: true,
    },
    password: {
      required: true,
    },
  };

  const form = {} as Form;

  describe('With override', () => {
    it('should return override message', () => {
      const configuration: OVConfiguration = {
        errorMessage: {
          override: {
            'username.required': 'Username is required',
          },
        },
      };

      const ov = new OV(form, validation, configuration);
      const ovResult = ov.validate();
      const expectedResult = {
        errors: ['Username is required', 'password.required'],
        object: {
          username: { errors: ['Username is required'] },
          password: { errors: ['password.required'] },
        },
      };

      deepStrictEqual(expectedResult, ovResult);
    });
  });
  describe('With prefix', () => {
    it('should return message with prefix', () => {
      const configuration: OVConfiguration = {
        errorMessage: {
          prefix: 'validation',
        },
      };

      const ov = new OV(form, validation, configuration);
      const ovResult = ov.validate();
      const expectedResult = {
        errors: ['validation.username.required', 'validation.password.required'],
        object: {
          username: { errors: ['validation.username.required'] },
          password: { errors: ['validation.password.required'] },
        },
      };

      deepStrictEqual(expectedResult, ovResult);
    });
  });
  describe('With addKeyPrefix = false', () => {
    it('should return message without key prefix', () => {
      const configuration: OVConfiguration = {
        errorMessage: {
          addKeyPrefix: false,
        },
      };

      const ov = new OV(form, validation, configuration);
      const ovResult = ov.validate();
      const expectedResult = {
        errors: ['required', 'required'],
        object: {
          username: { errors: ['required'] },
          password: { errors: ['required'] },
        },
      };

      deepStrictEqual(expectedResult, ovResult);
    });
  });
});
