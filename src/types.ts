import AbstractValidation from './validation_types/types/AbstractValidation';
import ValidationTypes from './validation_types/ValidationTypes';

type OVObject<T> = {
  [K in keyof T]: any;
};

type OVResultErrors = {
  errors?: string[],
};
type OVResultObject<T> = {
  [K in keyof T]: OVResultErrors;
};
type OVResult<T> = OVResultErrors & {
  object: OVResultObject<T>,
};

type FakeValidationType = (option: any) => any;

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-shadow
type Parameters<T> = T extends (...args: infer T) => any ? T : never;

type OVValidation<T> = {
  [K in keyof T]: OVValidationConfig
};
type OVValidationConfig = {
  [K in OVValidationConfigKey]?: Parameters<typeof ValidationTypes[K]>[0]
};
type OVValidationConfigKey = keyof typeof ValidationTypes;

type OVInternalValidation<T> = {
  [k in keyof T]: Array<AbstractValidation>
};
type ValidationObject = {
  type: 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function',
  key: string,
  value: any,
  object: Record<string, any>,
  keyInObject: boolean,
};

export {
  OVObject,

  OVResultErrors,
  OVResultObject,
  OVResult,

  FakeValidationType,

  OVValidation,
  OVValidationConfig,
  OVValidationConfigKey,

  OVInternalValidation,
  ValidationObject,
};
