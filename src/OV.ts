import {
  OVInternalValidation, OVObject, OVResult, OVValidation,
} from './types';
import { buildInternalValidation, validate } from './validation';

export default class OV<T extends OVObject> {
  private internalValidation: OVInternalValidation;

  public constructor(
    private object: T,
    validation: OVValidation,
  ) {
    this.internalValidation = buildInternalValidation(validation);
  }

  public validate(): OVResult<T> {
    return validate<T>(this.object, this.internalValidation);
  }
}
