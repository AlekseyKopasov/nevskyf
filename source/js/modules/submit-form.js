const submitForm = () => {
  const form = document.querySelector('.register__form');
  const successModal = document.querySelector('.modal.js-success');
  const errorModal = document.querySelector('.modal.js-error-modal');
  const URL = 'form-mailer.php';
  const ERROR_CLASS = 'is-error';
  const HIDDEN_CLASS = 'is-hidden';
  // const NEVSKY_FORUM_PAGE = 'https://nevskyf.ru';
  // const REDIRECT_TIME = 500;
  // setTimeout(() => {
  //   window.location.href = NEVSKY_FORUM_PAGE;
  // }, REDIRECT_TIME);

  const errorsMsgSet = {
    default: 'Произошла ошибка отправки формы. Пожалуйста, попробуйте еще раз.',
    exists: 'Пользователь с таким email уже зарегистрирован.'
  };

  const responseCodes = {
    success: 0,
    exist: 1,
    unknown: 2
  };

  if (!form) {
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  const errorText = form.querySelector('.register__error-main-text');

  const showSuccesModal = () => {
    if (!successModal) {
      return;
    }

    modals.open('success');
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
      const formData = {};

      for (let d of data) {
        formData[d[0]] = d[1];
      }

      await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(formData),
      })
      .then(response => response.text())
      .then((text) => {
        if (text == responseCodes.success) {
          showSuccesModal();
          evt.target.reset();
        }
        if (text == responseCodes.exist) {
          showErrorModal(errorsMsgSet.exists);
        }
        if (text == responseCodes.unknown) {
          showErrorModal(errorsMsgSet.default);
          evt.target.reset();
        }
      })
        .catch((text) => {
          showErrorModal(errorsMsgSet.default);
        });
    };

    setTimeout(() => {
      if (window.form._validState) {
        submitBtn.classList.remove(ERROR_CLASS);
        errorText.classList.add(HIDDEN_CLASS);

        const inputs = form.querySelectorAll('input');
        const selects = form.querySelectorAll('.custom-select__list');

        const formData = new FormData();

        inputs.forEach((input) => {
          let name = input.getAttribute('name');
          let checkbox = input.getAttribute('type') === 'checkbox';
          let isHiddenCheckboxParent = input.parentElement.parentElement.parentElement.parentElement.classList.contains('is-hidden');
          let value = input.value;
          let isChecked = input.checked;

          if (value.length && !checkbox) {
            formData.append(name, value);
          }
          if (checkbox && isChecked && !isHiddenCheckboxParent) {
            formData.append(name, value);
          }
        });

        selects.forEach((select) => {
          let item = select.querySelector('.custom-select__item[aria-selected="true"]');
          let name = select.parentElement.querySelector('select').getAttribute('name');
          formData.append(name, item.textContent);
        });
        fetchData(formData);
      } else {
        submitBtn.classList.add(ERROR_CLASS);
        errorText.classList.remove(HIDDEN_CLASS);
      }
    }, 0);
  };

  form.addEventListener('submit', submitHandler);
};

export {submitForm};
