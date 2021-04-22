import AbstractValidation from './AbstractValidation';
import { ValidationObject } from '../../types';

export default class EMail extends AbstractValidation {
  // eslint-disable-next-line no-useless-escape
  private static EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public constructor(private option: boolean) { super(); }

  public check(vObject: ValidationObject): void {
    if (
      this.option === true
      && vObject.type === 'string'
      && EMail.EMAIL_REGEX.test(vObject.value) === false
    ) {
      throw Error(`${vObject.key}.email`);
    }
  }
}
