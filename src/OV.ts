import {
  OVBuiltValidations, OVInputObject, OVResult, OVValidation,
} from './types';
import { buildValidation, validate } from './validation';

export default class OV<T extends OVInputObject> {
  private builtValidation: OVBuiltValidations;

  public constructor(
    private object: T,
    validation: OVValidation,
  ) {
    this.builtValidation = buildValidation(validation);
  }

  public validate(): OVResult<T> {
    return validate<T>(this.object, this.builtValidation);
  }
}
