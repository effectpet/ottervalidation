import {
  KeyOfT,
  OVConfiguration,
  OVInternalValidation,
  OVObject,
  OVResult,
  OVResultErrors,
  OVValidation,
} from './types';
import { buildInternalValidation, validate } from './validation';

export default class OV<T> {
  private validationKeys: KeyOfT<T>[];

  private internalValidation: OVInternalValidation<T>;

  public constructor(
    private object: OVObject<T>,
    validation: OVValidation<T>,
    private configuration?: OVConfiguration,
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
      this.configuration,
    );
  }

  public validateKey(key: KeyOfT<T>): OVResultErrors {
    const result = validate<T>(
      this.object,
      this.internalValidation,
      [key],
      this.configuration,
    );

    return result.object[key];
  }
}
