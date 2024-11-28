import { FormValidator } from '../../toolbox/form-validator';
import { isValidHandle, normalizeHandle } from '../../toolbox/string-utils';

export const Validator = (form: HTMLFormElement|string) => FormValidator(form)
  .rule(data => {
    if (!data.fullname.trim() && (!data.handle.trim() || data.handle?.trim() == '@')) {
      return {
        stop: true,
        message: 'Please, fill out the form',
      }
    }    
  })
  .rule(data => {
    if (normalizeHandle(data.handle) && !isValidHandle(data.handle)) {
      return {
        message: 'The handle you are trying to use is not valid. A valid handle must contain maximum of 60 chars and only letters, numbers, - and _.',
        redmark: ['handle'],
      }
    }
  })
  .rule(data => {
    if (!data.fullname.trim()) {
      return {
        message: 'Name cannot be empty',
        redmark: ['name'],
      }
    }    
  })
  .rule(data => {
    if (!data.handle || data.handle?.trim() == '@') {
      return {
        message: 'Choose your @handle',
        redmark: ['handle'],
      }
    }    
  })  
  .rule(data => {
    if (data.configuredomain && !data.domain.trim()) {
      return {
        message: 'Domain cannot be empty',
        redmark: ['domain'],
      }
    }
  })
  .rule(data => {
    if (data.domain && data.domain.split('.').length < 2) {
      return {
        message: 'Invalid domain',
        redmark: ['domain'],
      }
    }
  });