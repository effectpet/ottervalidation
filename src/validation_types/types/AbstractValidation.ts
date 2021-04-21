import { OVInputObject } from '../../types';

export default abstract class ValidationType {
  public abstract check(object: OVInputObject, key: string, value: unknown): void;
}
