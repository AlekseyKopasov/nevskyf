const submitForm = () => {
  const form = document.querySelector('.register__form');
  const successModal = document.querySelector('.modal.js-success');
  const errorModal = document.querySelector('.modal.js-error-modal');
  const NEVSKY_FORUM_PAGE = 'https://science.spb.ranepa.ru/nevskyforum';
  const URL = 'form-mailer.php';

  const errorsMsgSet = {
    default: 'Произошла ошибка отправки формы. Пожалуйста, попробуйте еще раз.',
    exists: 'Пользователь с таким email уже зарегистрирован.'
  };

  const responseCodes = {
    sucess: 0,
    exist: 1
  };

  if (!form) {
    return;
  }

  const showSuccesModal = () => {
    if (!successModal) {
      return;
    }

    succsuccessModaless.classList.add('is-active');
  }

  const showErrorModal = (text = errorsMsgSet.default) => {
    if (!errorModal) {
      return;
    }

    const description = errorModal.querySelector('.modal__description');
    description.textContent = text;
    modals.open('error');
  }

  const submitHandler = (evt) => {
    evt.preventDefault();

    const fetchData = async (data) => {
      await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(...data),
      })
          .then(((res) => {
            if (res.status === 200) {
              console.log('Показывать модальное окно');
              showSuccesModal();
              console.log('Очищать форму');
              evt.target.reset()
              console.log('Редирект обратно на форум');
              window.location.href = NEVSKY_FORUM_PAGE;
            }

            if (res.responseCodes === responseCodes.exist) {
              console.log('Такой пользователь уже зарегистрировался');
              showErrorModal(errorsMsgSet.exists);
            }

          }))
          .catch(() => {
            console.log('Необработанная ошибка');
            showErrorModal(errorsMsgSet.default);
          });
    };

    setTimeout(() => {
      if (window.form._validState) { // TODO fix error
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
          fetchData(formData);
        });
      }
    }, 0);
  };

  form.addEventListener('submit', submitHandler);
};

export {submitForm};
