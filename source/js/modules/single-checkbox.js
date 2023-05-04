const singleCheckbox = () => {
  const checkboxes = document.querySelectorAll('.custom-toggle--single');

  if (!checkboxes) {
    return;
  }

  const parent = checkboxes[0].parentElement.parentElement;

  const toggleCheckboxes = (inputs, target) => {
    inputs.forEach((input) => {
      input.parentElement.classList.toggle('disabled');
      input.toggleAttribute('disabled');
      if (input === target) {
        input.parentElement.classList.remove('disabled');
        input.removeAttribute('disabled');
      }
    });
  };

  const clickHandler = (evt) => {
    const {target} = evt;

    const inputs = target.parentElement.parentElement.parentElement.querySelectorAll('input');

    if (target.tagName === 'INPUT') {
      toggleCheckboxes(inputs, target);
    }
  };

  parent.addEventListener('click', clickHandler);
};

export {singleCheckbox};
