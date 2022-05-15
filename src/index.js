import './css/styles.css';
import {Notify} from 'notiflix';
import debounce from 'lodash.debounce';

import {fetchCountries} from './js/fetchCountries.js';
import {refs} from './js/get-refs.js';
import countryListTpl from './template/country-list.hbs';
import countryCardTpl from './template/country-card.hbs';

const DEBOUNCE_DELAY = 300;

const clearMarkup = () => {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
};
const createCountryMarkup = country => refs.countryInfo.innerHTML = countryCardTpl(country);
const createCountryList = countries => refs.countryList.innerHTML = countryListTpl(countries);

const renderCountryCard = countries => {
    const countriesQuantity = countries.length;
    clearMarkup();
    if(countriesQuantity > 10){
        Notify.warning("Too many matches found. Please enter a more specific name.")
    }
    else if(countriesQuantity > 1 && countriesQuantity <= 10){
        Notify.info(`Hooray! We found ${countriesQuantity} countries.`);
        createCountryList(countries);
} 
    else if(countriesQuantity === 1){
        Notify.success(`This is exactly what you were looking for!`);
         createCountryMarkup(countries);
    }
    };
const onFetchError = () => {
    Notify.failure('Oops! There is no country with that name!');
    clearMarkup();
};

const onSearch = e => {
    e.preventDefault;
   if(e.target.value){
    fetchCountries(e.target.value.trim())
    .then(renderCountryCard)
    .catch(onFetchError);
    }
    clearMarkup();
    
};
refs.searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));










