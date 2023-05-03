const inputOwnVersion = () => {
  const person = document.querySelector('[data-select="person"]');
  const HIDDEN_CLASS = 'is-hidden';

  if (!person) {
    return;
  }

  const clickHandler = () => {
    const text = person.querySelector('.custom-select__text');
    const input = document.querySelector('[data-input="person"]');
    const inputField = input.querySelector('input');
    const ownText = 'Другое (указать)';
    input.classList.add(HIDDEN_CLASS);

    if (text.textContent !== ownText) {
      inputField.focus();
      inputField.parentElement.classList.add('is-valid');
      inputField.parentElement.classList.remove('is-invalid');
    }

    if (text.textContent === ownText && input) {
      input.classList.remove(HIDDEN_CLASS);
      inputField.focus();
    }
  };

  person.addEventListener('click', clickHandler);
};

export {inputOwnVersion};
