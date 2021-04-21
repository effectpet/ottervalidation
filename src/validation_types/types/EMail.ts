import AbstractValidation from './AbstractValidation';
import { OVInputObject } from '../../types';

export default class EMail extends AbstractValidation {
  // eslint-disable-next-line no-useless-escape
  public static readonly EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public constructor(private option: boolean) { super(); }

  public check(object: OVInputObject, key: string, value: unknown): void {
    if (
      this.option === true
      && typeof value === 'string'
      && EMail.EMAIL_REGEX.test(value) === false
    ) {
      throw Error(`${key}.email`);
    }
  }
}
