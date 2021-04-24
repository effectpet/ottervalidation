import AbstractValidation from './AbstractValidation';
import { ValidationObject } from '../../types';

export default class Type extends AbstractValidation {
  public constructor(private option: string | string[]) { super(); }

  public check(vObject: ValidationObject): void {
    const optionIsArray = Array.isArray(this.option);

    if (
      vObject.keyInObject === true
      && (
        (optionIsArray === true && this.option.indexOf(vObject.type) === -1)
        || (optionIsArray === false && this.option !== vObject.type)
      )
    ) {
      throw Error('type');
    }
  }
}
