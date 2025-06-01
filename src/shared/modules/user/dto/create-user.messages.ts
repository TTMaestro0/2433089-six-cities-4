export const CreateUserMessages = {
  name: {
    invalidFormat: 'Name is required',
    lengthField: 'Min name length is 1, max length is 15',
  },
  email: {
    invalidFormat: 'Email must be a valid address'
  },
  avatar: {
    invalidFormat: 'Avatar is required',
  },
  password: {
    invalidFormat: 'Password is required',
    lengthField: 'Min password length is 6, max is 12'
  },
  type: {
    invalidFormat: 'Type is required',
  }
} as const;
