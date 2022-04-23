import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

import countryCardTpl from './country-card.hbs'
const DEBOUNCE_DELAY = 300;

const refs = {
    searchInput: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
}
// const onSearch = e =>{
//     e.preventDefault;

// }
// refs.searchInput.addEventListener('input', onSearch);

// const fetchCountries = (name) => {

// }
fetch('https://restcountries.com/v3.1/name/peru')
.then(response =>{
   return response.json();
}).then((country)=>{
    console.log(country);
    const markup = countryCardTpl(country[0]);
    console.log(markup);
    refs.countryInfo.innerHTML = markup;
}).catch(error => {
    return Notiflix.Notify.failure('Oops! There is no country with that name!');
});

// refs.countryList.insertAdjacentHTML("beforebegin", ``);