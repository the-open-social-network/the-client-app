import { FormValidator } from "../../../toolbox/form-validator";
import { isValidWebLink } from "../../../toolbox/string-utils";

export const Validator = (form: HTMLFormElement|string) => FormValidator(form)
  .rule(data => {
    if (!data.href.trim() && !data.label.trim()) {
      return {
        stop: true,
        message: 'Please, fill out the form',
      }
    }      
  })
  .rule(data => {
    if (!data.label.trim()) {
      return {
        message: 'Label cannot be empty',
        redmark: ['label'],
      }
    }
  })
  .rule(data => {
    if (!data.href.trim()) {
      return {
        message: 'URL cannot be empty',
        redmark: ['href'],
      }
    }
  })  
  .rule(data => {
    if (data.label.length > 50) {
      return {
        message: 'Label cannot have more then 50 characters',
        redmark: ['label'],
      }
    }
  })
  .rule(data => {
    if (data.href && !isValidWebLink(data.href)) {
      return {
        message: 'Invalid URL',
        redmark: ['href'],
      }
    }
  })
