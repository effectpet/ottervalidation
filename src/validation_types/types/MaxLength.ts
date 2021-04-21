import AbstractValidation from './AbstractValidation';
import { OVInputObject } from '../../types';

export default class MaxLength extends AbstractValidation {
  public constructor(private option: number) { super(); }

  public check(object: OVInputObject, key: string, value: unknown): void {
    if (
      typeof value === 'string'
      && value.length > this.option
    ) {
      throw Error(`${key}.maxlength`);
    }
  }
}
