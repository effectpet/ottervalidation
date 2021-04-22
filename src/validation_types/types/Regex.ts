import AbstractValidation from './AbstractValidation';
import { ValidationObject } from '../../types';

export default class Regex extends AbstractValidation {
  public constructor(private option: RegExp) { super(); }

  public check(vObject: ValidationObject): void {
    if (
      vObject.type === 'string'
      && this.option.test(vObject.value) === false
    ) {
      throw Error(`${vObject.key}.regex`);
    }
  }
}
