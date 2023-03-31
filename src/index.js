import './css/styles.css';
import debounce from 'lodash.debounce';
import API from './fetchCountries';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
//import countryCard from './templates/country-card.hbs';
//import countryList from './templates/country-list.hbs';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector("#search-box");
const countryListEl = document.querySelector(".country-list");
const countryInfotEl = document.querySelector(".country-info");

inputEl.addEventListener('input', debounce(handleInputCountryBox, DEBOUNCE_DELAY));
//inputEl.addEventListener('input', handleInputCountryBox);

function handleInputCountryBox(e) {
    const box = e.target;
    const seekedCountry = box.value.trim();
    API.fetchCountries(seekedCountry)
        .then(renderCountry)
        .catch(onFetchError)
        .finally(() => inputEl.innerHTML = '');
}

function renderCountry(country) {
    if (country.length > 10) {
        return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    } else if (country.length === 1) {
    const markup = country.map(({name, population, capital, flags, languages}) => {
        return `<div class="country-card">
    <div class="country-img">
        <img class="flags-img" src=${flags.svg} alt="" width="50">
    </div>
    <div class="country-card-body">
        <h2 class="country-card-title"><b> ${name.official}</b></h2>
        <p><b>Capital:</b> ${capital}</p>
        <p><b>Population:</b> ${population}</p>
        <p><b>Languages:</b> ${languages}</p>
    </div>
    </div>`}).join('');
    console.log(markup);
    countryInfotEl.innerHTML = markup;
    } else if (country.length >= 2 && country.length <= 10) {
    const markup = country.map(({flags, name}) => {
        return `<li>
    <img class="flags-img" src="${flags.svg}" alt="" width="50">
    <h3><b>${name.official}</b></h3>
    </li>`}).join('');
    countryListEl.innerHTML = markup;
    }
}
function onFetchError(error) {
    Notiflix.Notify.failure("Oops, there is no country with that name");
}