import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { refs } from './refs';
const DEBOUNCE_DELAY = 300;

const handleInput = event => {
  const name = event.target.value.trim().toLowerCase();
  if (event.target.value === '') {
    refs.countryList.innerHTML = '';
    refs.countryCard.innerHTML = '';
    return;
  }
  fetchCountries(name);
};
const debouncedHandle = debounce(handleInput, DEBOUNCE_DELAY);
refs.inputEl.addEventListener('input', debouncedHandle);
