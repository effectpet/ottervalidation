import {
  OVInternalValidation, OVObject, OVResult, OVValidation,
} from './types';
import { buildInternalValidation, validate } from './validation';

export default class OV<T> {
  private internalValidation: OVInternalValidation<T>;

  public constructor(
    private object: OVObject<T>,
    validation: OVValidation<T>,
  ) {
    this.internalValidation = buildInternalValidation(validation);
  }

  public validate(): OVResult<T> {
    return validate<T>(this.object, this.internalValidation);
  }
}
