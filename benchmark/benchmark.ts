import { OV, OVObject, OVValidation } from '../src';

const benchmark = <T>(
  form: OVObject<T>,
  validation: OVValidation<T>,
  iterations: number,
): string => {
  const start = new Date();

  for (let i = 0; i < iterations; i += 1) {
    const ov = new OV(form, validation);
    ov.validate();
  }

  const finish = new Date();
  const difference = (finish.getTime() - start.getTime());

  return `${difference}ms after ${iterations} iterations`;
};

interface Form {
  username: string,
  password: string,
  emailAddress: string,
}

const form: Form = {
  username: 'Username',
  password: 'SomeP4ssw0rd!',
  emailAddress: 'some@mail.com',
};

const validation: OVValidation<Form> = {
  username: {
    required: true,
    type: 'string',
    minLength: 4,
    maxLength: 32,
  },
  password: {
    required: true,
    type: 'string',
    minLength: 8,
    maxLength: 128,
    minLowerCase: 1,
    minUpperCase: 1,
    minSymbol: 1,
    minNumeric: 1,
  },
  emailAddress: {
    required: true,
    type: 'string',
    email: true,
  },
};

// eslint-disable-next-line no-console
console.log(benchmark(form, validation, 10000));
