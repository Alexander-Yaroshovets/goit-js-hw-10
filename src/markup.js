export const createMarkupMain = data =>
  data
    .map(array => {
      const languages = Object.values(array.languages).join('');
      return `
    <img src="${array.flags.svg}" alt="${array.name.official}" width = 70  />
    <h1 class = "title">${array.name.official}</h1>
      <ul class = "list">
        <li class = "link">Capital: ${array.capital[0]}</li>
        <li class = "link">Population: ${array.population}</li>
        <li class = "link">Language: ${languages}</li>
      </ul>
    `;
    })
    .join('');
export const createMarkupSecondary = data =>
  data
    .map(array => {
      return `<div class = "country_shortinfo">
  <img src="${array.flags.svg}" alt="${array.name.official}" width = 70 />
  <h1 class = "title">${array.name.official}</h1>
  </div>`;
    })
    .join('');
