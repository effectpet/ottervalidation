import AbstractValidation from './AbstractValidation';
import { ValidationObject } from '../../types';

export default class MinLowerCase extends AbstractValidation {
  private static LOWERCASE_REGEX = /[a-z]/g;

  public constructor(private option: number) { super(); }

  public check(vObject: ValidationObject): void {
    if (
      vObject.type === 'string'
      && (vObject.value.match(MinLowerCase.LOWERCASE_REGEX) || []).length < this.option
    ) {
      throw Error('minlowercase');
    }
  }
}
