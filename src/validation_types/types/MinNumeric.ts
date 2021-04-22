import AbstractValidation from './AbstractValidation';
import { ValidationObject } from '../../types';

export default class MinNumeric extends AbstractValidation {
  private static NUMERIC_REGEX = /[0-9]/g;

  public constructor(private option: number) { super(); }

  public check(vObject: ValidationObject): void {
    if (
      vObject.type === 'string'
      && (vObject.value.match(MinNumeric.NUMERIC_REGEX) || []).length < this.option
    ) {
      throw Error(`${vObject.key}.minnumeric`);
    }
  }
}
