const submitForm = () => {
  const form = document.querySelector('.register__form');

  if (!form) {
    return;
  }

  const submitHandler = (evt) => {
    evt.preventDefault();

    setTimeout(() => {
      if (window.form._validState) {
        const inputs = form.querySelectorAll('input');

        const formData = new FormData();

        inputs.forEach((input) => {
          let name = input.getAttribute('name');
          let checkbox = input.getAttribute('type') === 'checkbox';
          let value = input.value;
          let isChecked = input.checked;

          if (value.length && !checkbox) {
            formData.append(name, value);
          }
          if (checkbox && isChecked) {
            formData.append(name, value);
          }
        });

        fetch('./.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: formData,
        })
            .then(((res) => {
              if (res.status === '200') {
                console.log('Показывать модальное окно');
                console.log('Очищать форму');
              }
            }))
            .catch();
      }
    }, 0);
  };

  form.addEventListener('submit', submitHandler);
};

export {submitForm};
