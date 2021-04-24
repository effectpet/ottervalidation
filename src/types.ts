import AbstractValidation from './validation_types/types/AbstractValidation';
import ValidationTypes from './validation_types/ValidationTypes';

type OVObject<T> = {
  [K in KeyOfT<T>]: any;
};

type OVResultErrors = {
  errors?: string[],
};
type OVResultObject<T> = {
  [K in KeyOfT<T>]: OVResultErrors;
};
type OVResult<T> = OVResultErrors & {
  object: OVResultObject<T>,
};

type FakeValidationType = (option: any) => any;
type KeyOfT<T> = keyof T;

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-shadow
type Parameters<T> = T extends (...args: infer T) => any ? T : never;

type OVValidation<T> = {
  [K in KeyOfT<T>]: OVValidationConfig
};
type OVValidationConfig = {
  [K in OVValidationConfigKey]?: Parameters<typeof ValidationTypes[K]>[0]
};
type OVValidationConfigKey = keyof typeof ValidationTypes;

type OVInternalValidation<T> = {
  [k in KeyOfT<T>]: Array<AbstractValidation>
};
type ValidationObject = {
  type: 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function',
  key: string,
  value: any,
  object: Record<string, any>,
  keyInObject: boolean,
};

type OVConfiguration = {
  errorMessage?: {
    prefix?: string,
    addKeyPrefix?: boolean,
    override?: Record<string, string>
  }
};

export {
  OVObject,

  OVResultErrors,
  OVResultObject,
  OVResult,

  FakeValidationType,
  KeyOfT,

  OVValidation,
  OVValidationConfig,
  OVValidationConfigKey,

  OVInternalValidation,
  ValidationObject,

  OVConfiguration,
};
