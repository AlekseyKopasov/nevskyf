const toggleSections = () => {
  const dateTabs = document.querySelector('.register__fieldset[data-tabs="sections-tabs"]');

  if (!dateTabs) {
    return;
  }

  const HIDDEN_CLASS = 'is-hidden';

  const inputHandler = (evt) => {
    const {target} = evt;
    const id = target.getAttribute('id');

    const panels = dateTabs.parentElement.querySelectorAll(`[data-sections-tab="${id}"]`);

    if (!panels) {
      return;
    }

    panels.forEach((panel) => {
      if (panel.classList.contains(HIDDEN_CLASS)) {
        panel.classList.remove(HIDDEN_CLASS);
      } else {
        panel.classList.add(HIDDEN_CLASS);
      }
    });
  };

  const clickHandler = () => {
    const title = document.querySelector('[data-sections="panel"] .register__title');

    setTimeout(() => {
      const allEmptyCheckboxes = dateTabs.querySelector('.custom-toggle--checkbox.is-valid');
      if (allEmptyCheckboxes) {
        title.classList.remove(HIDDEN_CLASS);
      } else {
        title.classList.add(HIDDEN_CLASS);
      }
    }, 0);

  };

  dateTabs.addEventListener('input', inputHandler);
  dateTabs.addEventListener('click', clickHandler);
};

export {toggleSections};
