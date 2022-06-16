import { KeyboardEvent, RefObject } from 'react';

export const useFocusOnEnter = (formRef: RefObject<HTMLFormElement>) => {
  const onEnterKey = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter' && formRef.current) {
      const form = formRef.current;

      const index = Array.prototype.indexOf.call(form, event.target);

      if (index) {
        (formRef.current[index + 1] as HTMLElement).focus();
      }
    }
  };

  return { onEnterKey };
};
