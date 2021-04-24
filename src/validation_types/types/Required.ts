import AbstractValidation from './AbstractValidation';
import { ValidationObject } from '../../types';

export default class Required extends AbstractValidation {
  public constructor(private option: boolean) { super(); }

  public check(vObject: ValidationObject): void {
    if (
      this.option === true
      && vObject.keyInObject === false
    ) {
      throw Error('required');
    }
  }
}
