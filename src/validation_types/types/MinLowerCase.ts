import AbstractValidation from './AbstractValidation';
import { OVInputObject } from '../../types';

export default class MinLowerCase extends AbstractValidation {
  public static readonly LOWERCASE_REGEX = /[a-z]/g;

  public constructor(private option: number) { super(); }

  public check(object: OVInputObject, key: string, value: unknown): void {
    if (
      typeof value === 'string'
      && (value.match(MinLowerCase.LOWERCASE_REGEX) || []).length < this.option
    ) {
      throw Error(`${key}.minlowercase`);
    }
  }
}
