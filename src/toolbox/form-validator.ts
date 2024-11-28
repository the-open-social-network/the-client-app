import { TypeOptions, toast } from "react-toastify";
import { serializeFormData } from "./serialize-form-data"

type FormError = Partial<{
  stop: boolean;
  redmark: Array<string>,
  message: string|{ content: string, type: TypeOptions},
}>

type ValidationResults = {
  data: Record<string, string>;
  errors: Array<FormError>;
  valid: boolean;
}

type RuleCallback = (data: Record<string|number|symbol, any>, context?: any) => FormError|undefined|null;

export function FormValidator(form: HTMLFormElement|string) {
  const rules: Array<Function> = [];

  const chain = {
    getForm: (): HTMLFormElement => {
      return typeof form === 'string'
        ? document.getElementById(form) as HTMLFormElement
        : form as HTMLFormElement;
    },
  
    rule: (cb: RuleCallback) => {
      rules.push(cb);
      return chain;
    },

    redmark: (names: Array<string>) => {
      names.forEach(name => {
        const $form = chain.getForm();
        const control = $form.querySelector(`[name=${name}]`) as HTMLElement;
          
        if (control) {
          if (!control.hasAttribute('data-redmark')) {
            control.addEventListener('input', () => {
              console.log('hello')
              control.removeAttribute('data-redmark');
            }, { once: true });
          }
  
          control.dataset.redmark = 'true';              
        }
      });

      return chain;
    },

    inform(error: FormError) {
      if (!error.message) {
        return;
      }

      if (typeof error.message === 'string') {
        const toastId = `${btoa(error.message).substring(5)}`;  
        return toast.error(error.message, { toastId });  
      }

      if (typeof error.message === 'object') {
        return toast(error.message.content, {
          type: error.message.type || 'error',
          toastId: `${btoa(error.message.content).substring(5)}`,
        });
      }
    },

    data() {
      const $form = chain.getForm();
      return serializeFormData(new FormData($form));
    },

    run({ quiet, context }: { quiet?: boolean, context?: any } = {}): ValidationResults {
      const errors: Array<FormError> = [];
      const data = chain.data();
      
      const result = (errors: Array<FormError>) => ({
        data,
        errors,
        valid: !errors.length
      });

      for(const rule of rules.values()) {
        const error = rule && rule(data, context);

        if (!error) {
          continue;  
        }

        errors.push(error);

        if (!quiet && error.message) {
          chain.inform(error);
        }

        if (!quiet && error.redmark) {
          chain.redmark(error.redmark);
        }

        if (error.stop) {
          return result(errors);
        }
      }

      return result(errors);
    }
  }

  return chain;
}