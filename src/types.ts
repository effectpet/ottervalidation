import AbstractValidation from './validation_types/types/AbstractValidation';
import ValidationTypes from './validation_types/ValidationTypes';

type OVObject = Record<string, any>;
type ResultErrors = {
  errors?: Array<string>
};
type OVResult<T> = ResultErrors & {
  [K in keyof T]: ResultErrors;
};
type FakeValidationType = (option: any) => any;
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-shadow
type Parameters<T> = T extends (...args: infer T) => any ? T : never;
type ValidationKey = keyof typeof ValidationTypes;
type OVValidationConfig = {
  [K in ValidationKey]?: Parameters<typeof ValidationTypes[K]>[0]
};
type OVValidation = {
  [key: string]: OVValidationConfig
};
type OVInternalValidation = {
  [key: string]: Array<AbstractValidation>
};

type ValidationObject = {
  type: 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function',
  key: string,
  value: any,
  object: OVObject,
  keyInObject: boolean,
};

export {
  OVObject,
  OVResult,
  ResultErrors,
  FakeValidationType,
  ValidationKey,
  OVValidation,
  OVValidationConfig,
  OVInternalValidation,
  ValidationObject,
};
