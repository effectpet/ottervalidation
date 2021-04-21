import AbstractValidation from './AbstractValidation';
import { OVInputObject } from '../../types';

export default class MinNumeric extends AbstractValidation {
  public static readonly NUMERIC_REGEX = /[0-9]/g;

  public constructor(private option: number) { super(); }

  public check(object: OVInputObject, key: string, value: unknown): void {
    if (
      typeof value === 'string'
      && (value.match(MinNumeric.NUMERIC_REGEX) || []).length < this.option
    ) {
      throw Error(`${key}.minnumeric`);
    }
  }
}
