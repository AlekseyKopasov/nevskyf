const submitForm = () => {
  const form = document.querySelector('.register__form');

  if (!form) {
    return;
  }

  const submitHandler = (evt) => {
    evt.preventDefault();
  };

  form.addEventListener('submit', submitHandler);
};

export {submitForm};
