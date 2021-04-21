import AbstractValidation from './AbstractValidation';
import { OVInputObject } from '../../types';

export default class MinUpperCase extends AbstractValidation {
  public static readonly UPPERCASE_REGEX = /[A-Z]/g;

  public constructor(private option: number) { super(); }

  public check(object: OVInputObject, key: string, value: unknown): void {
    if (
      typeof value === 'string'
      && (value.match(MinUpperCase.UPPERCASE_REGEX) || []).length < this.option
    ) {
      throw Error(`${key}.minuppercase`);
    }
  }
}
