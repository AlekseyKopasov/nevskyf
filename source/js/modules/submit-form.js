const submitForm = () => {
  const form = document.querySelector('.register__form');

  if (!form) {
    return;
  }

  const submitHandler = (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    // console.log(...formData);
  };

  form.addEventListener('submit', submitHandler);
};

export {submitForm};
