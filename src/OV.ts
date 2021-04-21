import {
  OVBuiltValidations, OVInputObject, OVResult, OVValidations,
} from './types';
import { buildValidation, validate } from './validation';

export default class OV<T extends OVInputObject> {
  private builtValidation: OVBuiltValidations;

  public constructor(
    private object: T,
    validations: OVValidations,
  ) {
    this.builtValidation = buildValidation(validations);
  }

  public validate(): OVResult<T> {
    return validate<T>(this.object, this.builtValidation);
  }
}
