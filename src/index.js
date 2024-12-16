import { configCountry } from '../config.js';
import { fetchData } from './API/api.js';

const select = document.getElementById('selectCountry');
const divInfo = document.getElementById('divInfo');
const temp = document.getElementById('temp');
const img = document.getElementById('imgWeather');
const date = document.getElementById('infoDate')
const spanCity = document.getElementById('infoCity')

const displayOption = () => {
    configCountry.country.forEach((city, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = city.name;
        select.appendChild(option)
    })
}

const kelvinToCelsius = (degres) => {
    return Math.round(degres - 273.15); 
}

const timestampToDate = (x) => {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
    const newDate = new Date(x * 1000);
    return newDate.toLocaleDateString('fr-FR', options)
}

const fetch = async(c) => {
    let city = configCountry.country[c - 1];
    let data = await fetchData(city.lat, city.lon);
    displayInfo(data, city.name);
};

const displayInfo = (data, city) => {
    let imgs;
    let alt;
    switch (data.list[0].weather[0].main) {
        case 'Rain': 
            imgs = './src/imgs/rain.png';
            alt = 'nuageux;'
        break;
        case 'Clouds':
            imgs = './src/imgs/cloud.png';
            alt = 'nuageux;'
            break;
        case 'Snow':
            imgs = './src/imgs/snow.png';
            alt = 'nuageux;'
            break;
        default : 
            imgs = './src/imgs/sun.png';
            alt = 'nuageux;'
    }
    divInfo.innerHTML = `
        <h2 class="font-semibold p-5 text-2xl">Actuellement</h2>
        <div class="grid grid-cols-2 gap-11 mx-5 pb-3 border-b">
            <p class="text-6xl flex items-center"><span id="temp">${kelvinToCelsius(data.list[0].main.temp)}</span>°C</p>
            <img id="imgWeather" class="size-32" src="${imgs}" alt="${alt}">
        </div>
        <div class="m-5 flex flex-col justify-between h-14">
            <p id="infoDate"><i class="fa-solid fa-calendar pr-2"></i> ${timestampToDate(data.list[0].dt)}</p>
            <p><i class="fa-solid fa-location-dot pr-2"></i><span id="infoCity">${city}</span>, France</p>
        </div>
    `
}

select.addEventListener('change', () => {
    const optionSelect = select.options[select.selectedIndex].value;
    fetch(optionSelect)    
})



document.addEventListener('DOMContentLoaded', displayOption);