import AbstractValidation from './AbstractValidation';
import { ValidationObject } from '../../types';

export default class MinUpperCase extends AbstractValidation {
  private static UPPERCASE_REGEX = /[A-Z]/g;

  public constructor(private option: number) { super(); }

  public check(vObject: ValidationObject): void {
    if (
      vObject.type === 'string'
      && (vObject.value.match(MinUpperCase.UPPERCASE_REGEX) || []).length < this.option
    ) {
      throw Error(`${vObject.key}.minuppercase`);
    }
  }
}
