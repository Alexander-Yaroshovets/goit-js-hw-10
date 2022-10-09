import { createMarkupMain } from './markup';
import { createMarkupSecondary } from './markup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './refs';
export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
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
}
