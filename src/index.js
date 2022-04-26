import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

import countryCardTpl from './country-card.hbs';
import {fetchCountries} from './js/fetchCountries.js';
import getRefs from './js/get-refs.js';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();
let countries = [];
const createCountryList = countries => {
    return countries.map(el => {
        return `<li><div class="country-title-box">
        <img class="country-flag" width="25" 
        src='${el.flags.svg}'/>
        <h2 class='country-title'>${el.name.official}</h2>
        </div></li>`
    }).join('');
}
const renderCountryCard = (countries) => {
    const countriesQuentity = countries.length;
    if(countriesQuentity > 10){
        return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")}
    else if(countriesQuentity > 1 && countriesQuentity <= 10){
        refs.countryList.insertAdjacentHTML('beforeend', createCountryList(countries));
        refs.countryList.classList.remove('visually-hidden');
        refs.countryInfo.classList.add('visually-hidden');
    } 
    else if(countriesQuentity === 1){
        refs.countryList.classList.add('visually-hidden');
        refs.countryInfo.classList.remove('visually-hidden');
        const markup = countryCardTpl(countries[0]);
        refs.countryInfo.innerHTML = markup;}
        }
const onFetchError = Error => {
    Notiflix.Notify.failure('Oops! There is no country with that name!');
    refs.countryInfo.remove();
    refs.countryList.remove();
}
const clearInput = () => {
    const currentData = refs.searchInput.value;
    if(currentData === ''){refs.countryInfo.remove();}
}
const onSearch = e => {
    e.preventDefault;
    const inputData = refs.searchInput.value.trim();

    fetchCountries(inputData)
    .then(renderCountryCard)
    .catch(onFetchError);

    clearInput();
}
refs.searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

