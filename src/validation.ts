import {
  OVValidations, OVBuiltValidations, ValidationTypeKeys, FakeValidationType, OVInputObject,
  ResultErrors, OVResult,
} from './types';
import ValidationTypes from './validation_types/ValidationTypes';

const validate = <T>(object: OVInputObject, builtValidation: OVBuiltValidations): OVResult<T> => {
  const objectResult: Partial<OVResult<Record<string, ResultErrors>>> = {};
  let objectErrors: Array<string> = [];

  Object.keys(builtValidation).forEach((objectKey) => {
    const keyErrors: Array<string> = [];

    builtValidation[objectKey].forEach((validation) => {
      try {
        validation.check(object, objectKey, object[objectKey]);
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

const buildValidation = (validations: OVValidations): OVBuiltValidations => {
  const validationsBuilt: OVBuiltValidations = {};

  Object.keys(validations).forEach((objectKey) => {
    const validation = validations[objectKey];

    validationsBuilt[objectKey] = [];

    const validationTypeKeys = Object.keys(validation) as Array<ValidationTypeKeys>;
    validationTypeKeys.forEach((validationTypeKey) => {
      const validationTypeOption = validation[validationTypeKey];
      const validationType = ValidationTypes[validationTypeKey] as FakeValidationType;
      const built = validationType(validationTypeOption);
      validationsBuilt[objectKey].push(built);
    });
  });

  return validationsBuilt;
};

export { validate, buildValidation };
