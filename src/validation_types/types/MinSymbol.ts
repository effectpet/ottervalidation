import AbstractValidation from './AbstractValidation';
import { ValidationObject } from '../../types';

export default class MinSymbol extends AbstractValidation {
  // eslint-disable-next-line no-useless-escape
  private static SYMBOL_REGEX = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;

  public constructor(private option: number) { super(); }

  public check(vObject: ValidationObject): void {
    if (
      vObject.type === 'string'
      && (vObject.value.match(MinSymbol.SYMBOL_REGEX) || []).length < this.option
    ) {
      throw Error(`${vObject.key}.minsymbol`);
    }
  }
}
