import './css/styles.css';
import debounce from 'lodash.debounce'; 
import Notiflix from 'notiflix';

import { fetchCountries } from "./fetchCountries";

console.log(fetchCountries('peru'));
const DEBOUNCE_DELAY = 500;

const input = document.querySelector('#search-box');
const listCountry = document.querySelector('.country-list')
const infoCountry = document.querySelector('.country-info')

input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
    const searchValue = evt.target.value.trim();
    if (!searchValue) {
        Notiflix.Notify.info('Oops, you didnt enter the name of the country')
        return;
    }
    fetchCountries(searchValue)
        .then(data => {
            console.log(!data || data.length > 10)
            if (!data || data.length > 10) {
                listCountry.innerHTML = "";
                infoCountry.innerHTML = "";
                if (data.length > 10) {Notiflix.Notify.failure('Too many matches found. Please enter a more specific name.')}
            }
            else {
                console.log(data)
                if (data.length === 1) {
                        listCountry.innerHTML = "";
                        creatMarkup(data)
                    }
                else {
                    infoCountry.innerHTML = "";
                    creatMarkupList(data)
                };
                }
        })
}

function creatMarkup(arr) {
    const markup = `<div>
   <img src="${arr[0].flags.svg}" alt="" width=30px> <span style="font-weight: bold;font-size: 28px;">${arr[0].name.official}</span>
   </div>
      <ul style="list-style: none; padding-left: 0;">
        <li><span style="font-weight: bold;">Capital:</span> ${arr[0].capital}</li>
        <li><span style="font-weight: bold;">Population:</span> ${arr[0].population}</li>
        <li><span style="font-weight: bold;">Languages:</span> ${Object.values(arr[0].languages)}</li>
      </ul>`
        infoCountry.innerHTML = markup;
}

function creatMarkupList(arr) {
    listCountry.style.listStyle = "none";
    listCountry.style.paddingLeft = "0";
    const markup = arr.map(item =>  `<li>
    <img src="${item.flags.svg}" alt="flag ${item.name.official}" width=30px>
    <span>${item.name.official}</span>
    </li>`).join('');
    listCountry.innerHTML = markup;
}
