const card = document.querySelector('main__information--block');
const cityValue = document.querySelector('.city--value');
const tempValue = document.querySelector('.temp--value');
const weatherValue = document.querySelector('.weather--value');
let curentCity = null;
let latitude = null;
let longitude = null;
let country = null;
let temp = null;
let weather = null;
function succes(pos){
    latitude = pos.coords.latitude;
    longitude = pos.coords.longitude;
    addMap(latitude, longitude);
    getCity(latitude, longitude);
    getWeather(latitude, longitude);
}
async function getCity(lat, lon){
    let url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=24f517c2ec2ed505707ede99a09af491`;
    const data = await fetch(url);
    const city = await data.json();
    curentCity = city[0].name;
    country = city[0].country;
}

async function getWeather(lat, lon){
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=24f517c2ec2ed505707ede99a09af491`;
    const data = await fetch(url);
    const cityWeather = await data.json();
    weather = cityWeather.weather[0].description;
    temp = Math.round((cityWeather.main.temp)-273.15);
    console.log(weather);
    outData();

}
function outData(){
    cityValue.innerHTML = `${curentCity} - ${country}`;
    tempValue.innerHTML = `${temp} °C`;
    weatherValue.innerHTML = weather;
}
function error(){
    console.log('error');
    let map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {minZoom: 3 ,maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
    let marker = L.marker([lat, lon]).addTo(map);
}
function addMap(lat, lon){
    let map = L.map('map').setView([lat, lon], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {minZoom: 3 ,maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
    let marker = L.marker([lat, lon], {icon: mark}).addTo(map);
}
var mark = L.icon({
    iconUrl: 'mark.svg',
});
navigator.geolocation.getCurrentPosition(succes, error);