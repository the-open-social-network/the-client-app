import { FormValidator } from '../../toolbox/form-validator';

export const Validator = (form: HTMLFormElement|string) => FormValidator(form)
  .rule(data => {
    if (!data.fullname.trim()) {
      return {
        message: 'Name cannot be empty',
        redmark: ['fullname'],
      }
    }
  })
  .rule(data => {
    if (data.minibio.trim() && data.minibio.trim().length > 300) {
      return {
        message: 'The "Bio" field has exceed the 300 characters limit',
        redmark: ['minibio'],
      }
    }
  });