import AbstractValidation from './validation_types/types/AbstractValidation';
import ValidationTypes from './validation_types/ValidationTypes';

type OVInputObject = Record<string, any>;
type ResultErrors = {
  errors?: Array<string>
};
type OVResult<T> = ResultErrors & {
  [K in keyof T]: ResultErrors;
};
type FakeValidationType = (option: any) => any;
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-shadow
type Parameters<T> = T extends (...args: infer T) => any ? T : never;
type ValidationTypeKeys = keyof typeof ValidationTypes;
type OVValidations = {
  [key: string]: {
    [K in ValidationTypeKeys]?: Parameters<typeof ValidationTypes[K]>[0]
  }
};
type OVBuiltValidations = {
  [key: string]: Array<AbstractValidation>
};

export {
  OVInputObject,
  OVResult,
  ResultErrors,
  FakeValidationType,
  ValidationTypeKeys,
  OVValidations,
  OVBuiltValidations,
};
