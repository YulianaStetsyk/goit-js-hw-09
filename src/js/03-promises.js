import Notiflix from 'notiflix';

const formEl = document.querySelector('form');
const inputEl = document.querySelectorAll('input');
const delayEl = inputEl[0];
const stepEl = inputEl[1];
const amountEl = inputEl[2];

formEl.addEventListener('submit', createPromise);

function createPromise(event) {
  let position = 1;
  let delay = Number(delayEl.value);
  const amount = Number(amountEl.value);
  const step = Number(stepEl.value);

  event.preventDefault();
  for (let i = 0; i < amount; i++) {
    const shouldResolve = Math.random() > 0.3;

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          resolve(` Fulfilled promise ${position + i} in ${delay}ms`);
        } else {
          reject(` Rejected promise ${position + i} in ${delay}ms`);
        }
        delay += step;
      }, delay + step * i);
    });

    promise
      .then(value => {
        Notiflix.Notify.success(value);
      })
      .catch(error => {
        Notiflix.Notify.failure(error);
      });
  }
}