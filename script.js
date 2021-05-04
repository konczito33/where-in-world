//VARIABLES
const URL__ALL = `https://restcountries.eu/rest/v2/all`
const URL__REGION = `https://restcountries.eu/rest/v2/region/{region}`
const URL__BY_NAME = `https://restcountries.eu/rest/v2/name/{name}`

const dropdownBtn = document.querySelector('.dropdown')
const dropdownList = document.querySelector('.dropdown__list')
const dropdownText = document.querySelector('.dropdown__text')
const searchInput = document.querySelector('.search')
const container = document.querySelector('.container')
const darkmodeBtn = document.querySelector('.header__darkmode')
const cards = document.querySelectorAll('.country')
const modal = document.querySelector('.modal')
let region;
let inputValue

//EVENT LISTENERS

searchInput.addEventListener('input', (e) => {
    updateInputValue(e)
    if (inputValue.length > 0) {
        container.innerHTML = ''
        fetchCountry(`https://restcountries.eu/rest/v2/name/${inputValue}`)
    } else {
        fetchCountry(URL__ALL)
    }
})

dropdownList.addEventListener('click', (e) => {
    dropdownUpdateText(e)
    container.innerHTML = ''
    if (region == 'all') {
        fetchCountry(URL__ALL)
    } else {
        fetchCountry(`https://restcountries.eu/rest/v2/region/${region}`)
    }
})



darkmodeBtn.addEventListener('click', darkmode)

//FUNCTIONS

function darkmode() {
    document.querySelector('html').classList.toggle('dark')
    if (document.querySelector('html').classList.contains('dark')) {
        darkmodeBtn.innerHTML = '<span class="far fa-sun"></span> Light Mode'
    } else {
        darkmodeBtn.innerHTML = '<span class="far fa-moon"></span> Dark Mode'

    }
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function expandDropdown() {
    const arrow = document.querySelector('.fa-chevron-down')
    arrow.classList.toggle('expanded')
    dropdownList.classList.toggle('expanded')
}

function dropdownUpdateText(e) {
    const target = e.target
    const item = target.getAttribute('data-region')
    dropdownText.textContent = item
    region = item.toLowerCase()
}

function updateInputValue(e) {
    inputValue = e.target.value.toLowerCase()
    console.log(inputValue)
}

async function fetchCountry(URL) {
    const res = await fetch(URL)
    const data = await res.json()
    displayCountries(data)
}


async function displayCountries(countries) {
    container.innerHTML = ''
    for (let i = 0; i < countries.length; i++) {
        const country = countries[i]
        const {
            name,
            region,
            population,
            flag,
            capital,
            subregion,
            nativeName,
            languages,
            currencies
        } = country
        const div = document.createElement('div')
        div.classList.add('country')
        div.innerHTML = `
          <img src="${flag}" class="country__flag"></img>
            <div class="country-info">
                <h3 class="country__name">${name}</h3>
                <p class="country__population"><span class="info">Population:</span> ${formatNumber(population)}</p>
                <p class="country__region"><span class="info">Region:</span> ${region}</p>
                <p class="country__capital"><span class="info">Capital:</span> ${capital}</p>
            </div>`

        div.addEventListener('click', (e) => {
            modal.classList.add('open')
            modal.innerHTML = `   <a href="index.html" class="modal__back">Back</a>
        <img src=${flag} class="modal__image"> 
        <div class="modal__info">
        <h4 class="modal__name"> ${name}</h4>
        <p class="modal__item"><strong>Native name: </strong>${nativeName}</p>
        <p class="modal__item"><strong>Population: </strong> ${population}</p>
        <p class="modal__item"><strong>Region: </strong> ${region}</p>
        <p class="modal__item"><strong>Subregion: </strong> ${subregion}</p>
        <p class="modal__item"><strong>Capital: </strong> ${capital}</p>
        <p class="modal__item"><strong>Currency: </strong> ${currencies[0].name}</p>
        <p class="modal__item"><strong>Language: </strong> ${languages[0].name}</p> </div>`
        if(modal.classList.contains('open')){
            document.body.style.overflow = 'hidden'
        } else{
            document.body.style.overflow = 'auto'
        }

        })

        container.appendChild(div)
    }
}
fetchCountry(URL__ALL)