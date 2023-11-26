const timeE1 = document.getElementById('time');
const dateE1 = document.getElementById('date');
const currentWeatherItemsE1 = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryE1 = document.getElementById('country');
const weatherForcastE1 = document.getElementById('weather-forcast');
const currentTempE1 = document.getElementById('current-temp');

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const months = ['jan', 'feb', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

const API_KEY = '49cc8c821cd2aff9af04c9f98c36eb74';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HoursFormat = hour >= 13 ? hour % 12 : hour;
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';

    timeE1.innerHTML = hoursIn12HoursFormat + ':' + minutes + ' ' + `<span id="am-pm">${ampm}</span>`;

    dateE1.innerHTML = days[day] + ',' + date + ' ' + months[month];
}, 1000);

getWeatherData();

function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
        let { latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                showWeatherData(data);
            });
    });
}

function showWeatherData(data) {
    let { humidity, pressure, sunrise, sunset, wind_speed } = data.current;

    currentWeatherItemsE1.innerHTML = `
        <div class="weather-items">
            <div>Humidity</div>
            <div>${humidity}%</div>
        </div>
        <div class="weather-items">
            <div>Pressure</div>
            <div>${pressure}</div>
        </div>
        <div class="weather-items">
            <div>Sunrise</div>
            <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
        </div>
        <div class="weather-items">
            <div>Sunset</div>
            <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
        </div>
        <div class="weather-items">
            <div>Wind Speed</div>
            <div>${wind_speed}</div>
        </div>
    `;
}
