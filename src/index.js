import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

import {fetchCountries} from './js/fetchCountries.js';
import {refs} from './js/get-refs.js';
import countryListTpl from './template/country-list.hbs';
import countryCardTpl from './template/country-card.hbs';

const DEBOUNCE_DELAY = 300;

const createCountryList = countries => countries.map(country => countryListTpl(country)).join('');
const renderCountryCard = (countries) => {
    const countriesQuantity = countries.length;
    if(countriesQuantity > 10){
        refs.countryInfo.innerHTML = '';
        refs.countryList.innerHTML = '';
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
    }
    else if(countriesQuantity > 1 && countriesQuantity <= 10){
        refs.countryInfo.innerHTML = '';
        refs.countryList.innerHTML  = createCountryList(countries);
    } 
    else if(countriesQuantity === 1){
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = countryCardTpl(countries[0]);
    }
        };
const onFetchError = () => {
    Notiflix.Notify.failure('Oops! There is no country with that name!');
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
};
const clearInput = () => refs.countryInfo.innerHTML = '';
const onSearch = e => {
    e.preventDefault;
   
   if(e.target.value){
    fetchCountries(e.target.value.trim())
    .then(renderCountryCard)
    .catch(onFetchError);
}
    clearInput();
};
refs.searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));


