let latitude;
let longitude;
let cityName;
let countryName;
let weatherValue;
let tempValue;
let urlIcon;
let text = '';
let map;
let mapActive = true;
const cityBox = document.querySelector('.main__city');
const iconBox = document.querySelector('.main__icon');
const tempBox = document.querySelector('.main__temp');
const weatherBox = document.querySelector('.main__weather');
const input = document.querySelector('.main__input--city');
const button = document.querySelector('.main__serch--button');
//live geo
function succes (pos){
    latitude = pos.coords.latitude;
    longitude = pos.coords.longitude;
    creatMap(latitude, longitude);
    getCity(latitude, longitude);
    getWeather(latitude, longitude);
}
function error (){
    mapActive = false;
}
async function getCity(lat, lon){
    try{
        const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=24f517c2ec2ed505707ede99a09af491`;
        const data = await fetch(url);
        const city = await data.json();
        cityName = city[0].name;
        countryName = city[0].country;
        cityBox.innerHTML = `${cityName} - ${countryName}`;
    }
    catch{
        console.log(error);
    }
}
//city sercher
button.addEventListener('click', ()=>{
    text = input.value;
    getCoords();
})
async function getCoords(){
    try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=24f517c2ec2ed505707ede99a09af491`;
        const data = await fetch(url);
        const coords = await data.json();
        latitude = coords.coord.lat;
        longitude = coords.coord.lon;
        console.log(latitude, longitude);
        getCity(latitude, longitude);
        getWeather(latitude, longitude);
        if(mapActive){
            removeMap();
        }
        creatMap(latitude, longitude);
    }
    catch{
        if(text.length === 0){
            alert('String is empty')
        }
        else{
            alert('Wrong data');
        }
    }
}

function creatMap(lat, lon){

    map = L.map('map').setView([lat, lon], 11);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 8,
        maxZoom: 12,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    mapActive = true;
}
function removeMap(){
    map.remove();
}
async function getWeather(lat, lon){
    try{
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=24f517c2ec2ed505707ede99a09af491`;
        const data = await fetch(url);
        const weather = await data.json();
        weatherValue = weather.weather[0].description;
        urlIcon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
        tempValue = Math.round((weather.main.temp) - 273.15);
        console.log(tempValue);
        outData();
    }
    catch{
        console.log('error');
    }
}
function outData(){
    iconBox.style.cssText = `background-image: url(${urlIcon});`;
    tempBox.innerHTML = `${tempValue} °C`;
    weatherBox.innerHTML = weatherValue;
}
navigator.geolocation.getCurrentPosition(succes, error)