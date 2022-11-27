import Notiflix from 'notiflix';

const baseUrl = 'https://restcountries.com/v3.1/name/';
const fullName = 'name';
const capital = 'capital';
const population = 'population';
const flags = 'flags';
const languages = 'languages';

const filterValue = `${fullName},${capital},${population},${flags},${languages}`;


export const fetchCountries = name => {
     return fetch(`${baseUrl}${name}?fields=${filterValue}`)
        .then(resp => {
            console.log(resp);
            if (!resp.ok) {
                throw new Error(resp.statusText)
            }
            return resp.json()
        })
         .catch(err => {
             console.log(err);
             Notiflix.Notify.info('Oops, there is no country with that name')
         })
} 

