import { ValidationObject } from '../../types';

export default abstract class ValidationType {
  public abstract check(vObject: ValidationObject): void;
}
