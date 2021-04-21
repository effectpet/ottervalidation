import AbstractValidation from './AbstractValidation';
import { OVInputObject } from '../../types';

export default class MinSymbol extends AbstractValidation {
  // eslint-disable-next-line no-useless-escape
  public static readonly SYMBOL_REGEX = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;

  public constructor(private option: number) { super(); }

  public check(object: OVInputObject, key: string, value: unknown): void {
    if (
      typeof value === 'string'
      && (value.match(MinSymbol.SYMBOL_REGEX) || []).length < this.option
    ) {
      throw Error(`${key}.minsymbol`);
    }
  }
}
