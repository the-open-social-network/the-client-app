import { isWebEmail } from "../../toolbox/string-utils";
import { FormValidator } from '../../toolbox/form-validator';

export const Validator = (form: HTMLFormElement|string) => FormValidator(form)
  .rule(data => {
    if (!data.email.trim() && !data.password.trim()) {
      return {
        stop: true,
        message: 'Please, fill out the form',
      }
    }      
  })
  .rule(data => {
    if (!isWebEmail(data.email)) {
      return {
        message: 'Invalid e-mail',
        redmark: ['email'],
      }
    }
  })
  .rule(data => {
    if (!data.password.trim()) {
      return {
        message: 'Password cannot be empty',
        redmark: ['password'],
      }
    }
  });