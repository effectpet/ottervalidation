import {
  OVValidation, OVInternalValidation, OVValidationConfigKey, FakeValidationType, OVObject,
  OVResultErrors, OVResult, ValidationObject, OVResultObject,
} from './types';
import ValidationTypes from './validation_types/ValidationTypes';

const validate = <T>(
  object: OVObject<T>,
  iValidation: OVInternalValidation<T>,
): OVResult<T> => {
  const resultObject: Partial<OVResultObject<T>> = {};
  const objectKeys = Object.keys(object) as Array<keyof OVObject<T>>;
  let resultErrors: string[] = [];

  const iValidationKeys = Object.keys(iValidation) as Array<keyof OVInternalValidation<T>>;
  iValidationKeys.forEach((iValidationKey) => {
    const objectValue = object[iValidationKey];
    const validationObject: ValidationObject = {
      type: typeof objectValue,
      key: String(iValidationKey),
      value: objectValue,
      object,
      keyInObject: objectKeys.indexOf(iValidationKey) > -1,
    };

    const keyErrors: string[] = [];
    const iValidationConfig = iValidation[iValidationKey];
    iValidationConfig.forEach((validationType) => {
      try {
        validationType.check(validationObject);
      } catch (e) {
        keyErrors.push(e.message);
      }
    });

    const keyResultErrors: OVResultErrors = {};
    if (keyErrors.length > 0) {
      keyResultErrors.errors = keyErrors;
      resultErrors = resultErrors.concat(keyErrors);
    }

    resultObject[iValidationKey] = keyResultErrors;
  });

  const objectResult: OVResult<T> = {
    object: resultObject as OVResultObject<T>,
  };

  if (resultErrors.length > 0) {
    objectResult.errors = resultErrors;
  }

  return objectResult;
};

const buildInternalValidation = <T>(validation: OVValidation<T>): OVInternalValidation<T> => {
  const internalValidation: Partial<OVInternalValidation<T>> = {};

  const validationKeys = Object.keys(validation) as Array<keyof typeof validation>;
  validationKeys.forEach((objectKey) => {
    const validationConfig = validation[objectKey];

    const validationConfigKeys = Object.keys(validationConfig) as Array<OVValidationConfigKey>;
    internalValidation[objectKey] = validationConfigKeys.map((validationConfigKey) => {
      const validationTypeOption = validationConfig[validationConfigKey];
      const validationType = ValidationTypes[validationConfigKey] as FakeValidationType;

      return validationType(validationTypeOption);
    });
  });

  return internalValidation as OVInternalValidation<T>;
};

export { validate, buildInternalValidation };
