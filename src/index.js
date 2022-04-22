import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

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
fetch('https://restcountries.com/v3.1/all')
.then(response =>{
   return response.json();
}).then((country)=>{
    console.log(country);
}).catch(error => {
    return Notiflix.Notify.failure('Oops! There is no country with that name!');
})

refs.countryList.insertAdjacentHTML("beforebegin", `<svg width="6" height="10" class="button__icon--pink">
<use href="./images/symbol-defs.svg#icon-Vector-1"></use>
</svg><h2 class='country-title'>${name.official}</h2><p class='country-capital'>${capital}</p><p class='country-population'>${population}</p><p class='country-languages'>${lang}</p>`);