import {
  OVValidation, OVInternalValidation, ValidationKey, FakeValidationType, OVObject,
  ResultErrors, OVResult, ValidationObject,
} from './types';
import ValidationTypes from './validation_types/ValidationTypes';

const validate = <T>(
  object: OVObject,
  internalValidation: OVInternalValidation,
): OVResult<T> => {
  const objectResult: Partial<OVResult<Record<string, ResultErrors>>> = {};
  let objectErrors: Array<string> = [];

  const objectKeys = Object.keys(object);

  Object.keys(internalValidation).forEach((objectKey) => {
    const internalValidationConfig = internalValidation[objectKey];
    const keyErrors: Array<string> = [];

    const validationObject: ValidationObject = {
      type: typeof object[objectKey],
      key: objectKey,
      value: object[objectKey],
      object,
      keyInObject: objectKeys.indexOf(objectKey) > -1,
    };

    internalValidationConfig.forEach((validationType) => {
      try {
        validationType.check(validationObject);
      } catch (e) {
        keyErrors.push(e.message);
      }
    });

    const keyResult: ResultErrors = {};
    if (keyErrors.length > 0) {
      keyResult.errors = keyErrors;
      objectErrors = objectErrors.concat(keyErrors);
    }

    objectResult[objectKey] = keyResult;
  });

  if (objectErrors.length > 0) {
    objectResult.errors = objectErrors;
  }

  return objectResult as OVResult<T>;
};

const buildInternalValidation = (validation: OVValidation): OVInternalValidation => {
  const internalValidation: OVInternalValidation = {};

  Object.keys(validation).forEach((objectKey) => {
    const validationConfig = validation[objectKey];

    internalValidation[objectKey] = [];

    const validationTypeKeys = Object.keys(validationConfig) as Array<ValidationKey>;
    validationTypeKeys.forEach((validationTypeKey) => {
      const validationTypeOption = validationConfig[validationTypeKey];
      const validationType = ValidationTypes[validationTypeKey] as FakeValidationType;
      const built = validationType(validationTypeOption);
      internalValidation[objectKey].push(built);
    });
  });

  return internalValidation;
};

export { validate, buildInternalValidation };
