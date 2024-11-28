import { checkPassword, isWebEmail } from '../../toolbox/string-utils';
import { FormValidator } from '../../toolbox/form-validator';

export const Validator = (form: HTMLFormElement|string) => FormValidator(form)
  .rule(data => {
    if (!data.email.trim() && !data.password.trim() && !data.repassword.trim()) {
      return {
        stop: true,
        message: 'Please, fill out the form',
      }
    }    
  })
  .rule(data => {
    if (!data.email || !isWebEmail(data.email)) {
      return {
        message: 'Invalid E-mail',
        redmark: ['email'],
      }
    }    
  })
  .rule(data => {
    if (!data.password.trim() && !data.repassword.trim()) {
      return {
        message: 'Define and confirm your password',
        redmark: ['password', 'repassword'],
      }
    }
  })
  .rule(data => {
    if (data.password.trim() !== data.repassword.trim()) {
      return {
        message: 'Password and confirmation does not match',
        redmark: ['password','repassword'],
      }
    }
  })
  .rule(data => {
    if (data.password && !checkPassword(data.password).strong) {
      return {
        message: 'Your password is considered weak',
        redmark: ['password','repassword'],
      }
    }
  })
  .rule(data => {
    if (!data.agreement) {
      return {
        message: 'You must agree with our terms and conditions in order to register',
        redmark: ['agreement'],
      }
    }
  });