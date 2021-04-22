import { OV, OVValidation } from '../src';

const benchmark = (
  form: Record<string, any>,
  validation: OVValidation,
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

const form = {
  username: 'Username',
  password: 'SomeP4ssw0rd!',
  emailaddress: 'some@mail.com',
};

const validation: OVValidation = {
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
  emailaddress: {
    required: true,
    type: 'string',
    email: true,
  },
};

// eslint-disable-next-line no-console
console.log(benchmark(form, validation, 10000));
