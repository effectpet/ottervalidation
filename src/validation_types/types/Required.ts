import AbstractValidation from './AbstractValidation';
import { OVInputObject } from '../../types';

export default class Required extends AbstractValidation {
  public constructor(private option: boolean) { super(); }

  public check(object: OVInputObject, key: string): void {
    if (
      this.option === true
      && Object.keys(object).indexOf(key) === -1
    ) {
      throw Error(`${key}.required`);
    }
  }
}
