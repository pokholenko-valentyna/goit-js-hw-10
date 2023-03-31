const BASE_URL = 'https://restcountries.com/v3.1';

function fetchCountries(name) {
    return fetch(`${BASE_URL}/name/${name}?fields=name.official,capital,population,flags.svg,languages`)
    .then(response => {
        console.log(response);
    
        if (!response.ok) {
            throw new Error(response.status);
            
        }
        return response.json();
    });
}

export default { fetchCountries };
