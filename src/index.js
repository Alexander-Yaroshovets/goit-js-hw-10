import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { refs } from './refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createMarkupMain } from './markup';
import { createMarkupSecondary } from './markup';
const DEBOUNCE_DELAY = 300;
const handleInput = event => {
  const name = event.target.value.trim().toLowerCase();
  if (event.target.value === '') {
    refs.countryList.innerHTML = '';
    refs.countryCard.innerHTML = '';
    return;
  }
  fetchCountries(name)
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if ((data.length > 1) & (data.length <= 10)) {
        const secondaryMarkup = createMarkupSecondary(data);
        refs.countryCard.innerHTML = '';
        refs.countryList.innerHTML = secondaryMarkup;
      } else if (data.length === 1) {
        const mainMarkup = createMarkupMain(data);
        refs.countryList.innerHTML = '';
        refs.countryCard.innerHTML = mainMarkup;
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      refs.countryList.innerHTML = '';
      refs.countryCard.innerHTML = '';
    });
};
const debouncedHandle = debounce(handleInput, DEBOUNCE_DELAY);
refs.inputEl.addEventListener('input', debouncedHandle);
