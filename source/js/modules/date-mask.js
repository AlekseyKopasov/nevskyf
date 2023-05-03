// import iMask from '../vendor/IMask';

function addDateMask() {
  const dates = document.querySelectorAll('input[data="date"]');

  /* eslint-disable */
  if (dates) {
    dates.forEach((date) => {
      let patternMask = IMask(date, {
        /* eslint-enable */
        mask: '{00}.{00}.{0000}',
      });
    });
  }
}

export {addDateMask};
