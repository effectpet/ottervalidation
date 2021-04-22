# OtterValidation

> Simple, lightweight validation with full typescript support

## Installation

```bash
npm install ottervalidation
```
## Usage

```javascript
import OV from 'ottervalidation';

const form = {
    username: 'Some username',
};

const validation: OVValidation = {
    username: {
        required: true,
    },
}

const ov = new OV(form, validation);
const ovResult = ov.validate();
/*
    ovResult: {
        username: {}
    }
*/
```

## Full example

```javascript
import OV from 'ottervalidation';

const form = {
    username: 'Some username',
    password: 'SomeP4ssword!',
    mailAddress: 'some@email.com',
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
        minUpperCase: 1,
        minLowerCase: 1,
        minNumeric: 1,
        minSymbol: 1,
    },
    mailAddress: {
        required: true,
        type: 'string',
        email: true,
    },
}

const ov = new OV(form, validation);
const ovResult = ov.validate();
/*
    ovResult: {
        username: {},
        password: {},
        mailAddress: {},
    }
*/
```

## Example with errors

```javascript
import OV from 'ottervalidation';

const form = {
    password: 'invalid length',
    mailAddress: 'invalid email',
};

const validation: OVValidation = {
    username: {
        required: true,
    },
    password: {
        minLength: 32,
    },
    mailAddress: {
        email: true,
    },
}

const ov = new OV(form, validation);
const ovResult = ov.validate();
/*
    ovResult: {
        errors?: ['username.required', 'password.minlength', 'mailAddress.email'],
        username: { errors?: ['username.required'] },
        password: { errors?: ['password.minlength'] },
        mailAddress: { errors?: ['mailAddress.email'] },
    }
*/
```

## Checks

| Key | Argument | Description | Works with |
| --- | --- | --- | --- |
| required | boolean | checks whether the key exists in the object | string, number, boolean |
| type | string | string[] | Checks whether the value is of the given type | string, number, boolean |
| minLength | number | Checks whether the value has the minimum length | string |
| maxLength | number | Checks whether the value has the maximum length | string |
| exactLength | number | Checks whether the value has the exact length | string |
| email | boolean | Checks whether the value is an e-mail address | string |
| minUpperCase | number | Checks whether the value has the minimum number of uppercase letters | string |
| minLowerCase | number | Checks whether the value has the minimum number of lowercase letters | string |
| minNumeric | number | Checks whether the value has the minimum number of numerics | string |
| minSymbol | number | Checks whether the value has the minimum number of symbol characters | string |
| regex | regex | Checks whether the value matches against the regex | string |

## Contributing

``` bash
# install dependencies
npm install

# run all tests
npm test

# run linter
npm run lint
```

## License

[MIT](https://opensource.org/licenses/MIT)
