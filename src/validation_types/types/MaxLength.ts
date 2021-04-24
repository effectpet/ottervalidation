import AbstractValidation from './AbstractValidation';
import { ValidationObject } from '../../types';

export default class MaxLength extends AbstractValidation {
  public constructor(private option: number) { super(); }

  public check(vObject: ValidationObject): void {
    if (
      vObject.type === 'string'
      && vObject.value.length > this.option
    ) {
      throw Error('maxlength');
    }
  }
}
