import AbstractValidation from './AbstractValidation';
import { OVInputObject } from '../../types';

export default class Type extends AbstractValidation {
  public constructor(private option: string) { super(); }

  public check(object: OVInputObject, key: string, value: unknown): void {
    if (
      Object.keys(object).indexOf(key) > -1
      && typeof value !== this.option
    ) {
      throw Error(`${key}.type`);
    }
  }
}
