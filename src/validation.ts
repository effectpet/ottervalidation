import {
  OVValidation,
  OVInternalValidation,
  OVValidationConfigKey,
  FakeValidationType,
  OVObject,
  OVResultErrors,
  OVResult,
  ValidationObject,
  OVResultObject,
  KeyOfT,
  OVConfiguration,
} from './types';
import ValidationTypes from './validation_types/ValidationTypes';

const buildErrorMessage = (
  errorKey: string,
  validationKey: string,
  configuration?: OVConfiguration,
): string => {
  let errorMessage = `${validationKey}.${errorKey}`;

  if (configuration?.errorMessage) {
    if (configuration.errorMessage.addKeyPrefix === false) {
      errorMessage = errorKey;
    }
    if (configuration.errorMessage.prefix) {
      errorMessage = `${configuration.errorMessage.prefix}.${errorMessage}`;
    }
    if (configuration.errorMessage.override) {
      errorMessage = configuration.errorMessage.override[errorMessage] ?? errorMessage;
    }
  }

  return errorMessage;
};

const validate = <T>(
  object: OVObject<T>,
  iValidation: OVInternalValidation<T>,
  validationKeys: KeyOfT<T>[],
  configuration?: OVConfiguration,
): OVResult<T> => {
  const resultObject: Partial<OVResultObject<T>> = {};
  const objectKeys = Object.keys(object) as KeyOfT<T>[];
  let resultErrors: string[] = [];

  validationKeys.forEach((validationKey) => {
    const objectValue = object[validationKey];
    const validationObject: ValidationObject = {
      type: typeof objectValue,
      key: String(validationKey),
      value: objectValue,
      object,
      keyInObject: objectKeys.indexOf(validationKey) > -1,
    };

    const keyErrors: string[] = [];
    const iValidationConfig = iValidation[validationKey];
    iValidationConfig.forEach((validationType) => {
      try {
        validationType.check(validationObject);
      } catch (e) {
        const errorKey = buildErrorMessage(e.message, validationObject.key, configuration);
        keyErrors.push(errorKey);
      }
    });

    const keyResultErrors: OVResultErrors = {};
    if (keyErrors.length > 0) {
      keyResultErrors.errors = keyErrors;
      resultErrors = resultErrors.concat(keyErrors);
    }

    resultObject[validationKey] = keyResultErrors;
  });

  const objectResult: OVResult<T> = {
    object: resultObject as OVResultObject<T>,
  };

  if (resultErrors.length > 0) {
    objectResult.errors = resultErrors;
  }

  return objectResult;
};

const buildInternalValidation = <T>(
  validation: OVValidation<T>,
  validationKeys: KeyOfT<T>[],
): OVInternalValidation<T> => {
  const internalValidation: Partial<OVInternalValidation<T>> = {};

  validationKeys.forEach((objectKey) => {
    const validationConfig = validation[objectKey];

    const validationConfigKeys = Object.keys(validationConfig) as OVValidationConfigKey[];
    internalValidation[objectKey] = validationConfigKeys.map((validationConfigKey) => {
      const validationTypeOption = validationConfig[validationConfigKey];
      const validationType = ValidationTypes[validationConfigKey] as FakeValidationType;

      return validationType(validationTypeOption);
    });
  });

  return internalValidation as OVInternalValidation<T>;
};

export { validate, buildInternalValidation };
