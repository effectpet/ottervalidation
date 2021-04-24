import {
  KeyOfT,
  OVInternalValidation, OVObject, OVResult, OVResultErrors, OVValidation,
} from './types';
import { buildInternalValidation, validate } from './validation';

export default class OV<T> {
  private validationKeys: KeyOfT<T>[];

  private internalValidation: OVInternalValidation<T>;

  public constructor(
    private object: OVObject<T>,
    validation: OVValidation<T>,
  ) {
    this.validationKeys = Object.keys(validation) as KeyOfT<T>[];
    this.internalValidation = buildInternalValidation<T>(
      validation,
      this.validationKeys,
    );
  }

  public validate(): OVResult<T> {
    return validate<T>(
      this.object,
      this.internalValidation,
      this.validationKeys,
    );
  }

  public validateKey(key: KeyOfT<T>): OVResultErrors {
    const result = validate<T>(
      this.object,
      this.internalValidation,
      [key],
    );

    return result.object[key];
  }
}
