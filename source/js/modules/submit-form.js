const submitForm = () => {
  const form = document.querySelector('.register__form');

  if (!form) {
    return;
  }

  const submitHandler = (evt) => {
    evt.preventDefault();

    const fetchData = async (data) => {
      await fetch('http://localhost:3000/form-mailer.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(...data),
      })
          .then(((res) => {
            if (res.status === '200') {
              console.log('Показывать модальное окно');
              console.log('Очищать форму');
            }

            if (res.status === '404') {
              console.log(123);
            }

          }))
          .catch(() => {
            console.log('error in send form script');
          });
    };

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

          fetchData(formData);
          // fetch('http://localhost:3000/form-mailer.php')
          // .then(res => {console.log('res',res);});
        });

        // fetch('http://localhost:3000/form-mailer.php', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json; charset=utf-8',
        //   },
        //   body: JSON.stringify(...formData),
        // })
        //     .then(((res) => {
        //       if (res.status === '200') {
        //         console.log('Показывать модальное окно');
        //         console.log('Очищать форму');
        //       }

        //       if (res.status === '404') {
        //         console.log(123);
        //       }

        //     }))
        //     .catch(() => {
        //       console.log('error in send form script');
        //     });
      }
    }, 0);
  };

  form.addEventListener('submit', submitHandler);
};

export {submitForm};
