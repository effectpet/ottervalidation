import EMail from './types/EMail';
import MaxLength from './types/MaxLength';
import MinLength from './types/MinLength';
import MinLowerCase from './types/MinLowerCase';
import MinNumeric from './types/MinNumeric';
import MinSymbol from './types/MinSymbol';
import MinUpperCase from './types/MinUpperCase';
import Required from './types/Required';
import Type from './types/Type';

const types = {
  required: (option: boolean): Required => new Required(option),
  type: (option: string): Type => new Type(option),
  minLength: (option: number): MinLength => new MinLength(option),
  maxLength: (option: number): MaxLength => new MaxLength(option),
  email: (option: boolean): EMail => new EMail(option),
  minUpperCase: (option: number): MinUpperCase => new MinUpperCase(option),
  minLowerCase: (option: number): MinLowerCase => new MinLowerCase(option),
  minNumeric: (option: number): MinNumeric => new MinNumeric(option),
  minSymbol: (option: number): MinSymbol => new MinSymbol(option),
};

export default types;
