export function submitOnMetaEnter(e: React.KeyboardEvent<HTMLElement>) {
  const allowedElements = ['input', 'textarea'];

  try {
    const { key, metaKey } = e;
    
    if (metaKey && key === 'Enter') {
      const $element = e.target as HTMLInputElement;
  
      if (!allowedElements.includes($element.tagName.toLowerCase())) {
        return;
      }

      const $form = $element?.form as HTMLFormElement;
      const $submit = $form && $form.querySelector('button[type=submit]') as HTMLButtonElement;
      $submit && $submit.click();
    }
  } catch {
    return;
  }
}
