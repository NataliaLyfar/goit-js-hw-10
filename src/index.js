import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

import countryCardTpl from './country-card.hbs';
import {fetchCountries} from './js/fetchCountries.js';
import getRefs from './js/get-refs.js';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

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
        return refs.countryList.insertAdjacentHTML('beforeend', createCountryList(countries))} 
    else if(countriesQuentity === 1){
        refs.countryList.remove();
        const markup = countryCardTpl(countries[0]);
        return refs.countryInfo.innerHTML = markup;}
        }
const onFetchError = Error => {
    Notiflix.Notify.failure('Oops! There is no country with that name!');
    refs.countryInfo.remove();
    return refs.countryList.remove();
}
const clearInput = e => {
    const currentData = e.currentTarget.value;
    if(currentData === ''){refs.countryInfo.remove();}
}
const onSearch = e => {
    e.preventDefault;
    const inputData = e.target.value.trim();

    fetchCountries(inputData)
    .then(renderCountryCard)
    .catch(onFetchError);

    clearInput();
}
refs.searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));


