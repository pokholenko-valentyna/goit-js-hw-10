import './css/styles.css';
import debounce from 'lodash.debounce';
import API from './fetchCountries';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector("#search-box");
const countryListEl = document.querySelector(".country-list");
const countryInfotEl = document.querySelector(".country-info");

inputEl.addEventListener('input', debounce(handleInputCountryBox, DEBOUNCE_DELAY));

function handleInputCountryBox(e) {
    const box = e.target;
    const seekedCountry = box.value.trim();
    if (seekedCountry === '') {
        countryInfotEl.innerHTML = '';
        countryListEl.innerHTML = '';
        return;
    }
    API.fetchCountries(seekedCountry)
        .then(renderCountry)
        .catch(onFetchError)
}

function renderCountry(country) {
    if (country.length > 10) {
        countryListEl.innerHTML = '';
        return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    } else if (country.length === 1) {
        countryListEl.innerHTML = '';
    const markup = country.map(({name, population, capital, flags, languages}) => {
        return `<div class="country-card">
    <div class="country-header">
        <div class="country-img">
            <img class="flags-img" src=${flags.svg} alt="" width="50" height=auto>
        </div>
        <div class="country-title">
            <h2 class="country-card-title"><b> ${name.official}</b></h2>
        </div>
    </div>  
    <div class="country-card-body">        
        <p><b>Capital:</b> ${capital}</p>
        <p><b>Population:</b> ${population}</p>
        <p><b>Languages:</b> ${Object.values(languages).join(", ")}</p>
    </div>
    </div>`}).join('');
    console.log(markup);
    countryInfotEl.innerHTML = markup;
    } else if (country.length >= 2 && country.length <= 10) {
        countryInfotEl.innerHTML = '';
    const markup = country.map(({flags, name}) => {
        return `<li class="list-item">
    <img class="flags-img" src="${flags.svg}" alt="" width="50" height=auto>
    <h3><b>${name.official}</b></h3>
    </li>`}).join('');
    countryListEl.innerHTML = markup;
    } else if (seekedCountry === '') {
        return;
    }
}
function onFetchError(error) {
    countryInfotEl.innerHTML = '';
    countryListEl.innerHTML = '';
    Notiflix.Notify.failure("Oops, there is no country with that name");
}