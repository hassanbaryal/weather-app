import './assets/styles/style.css';
import validateForm from './modules/form-validation';
import updateInfo from './modules/update-UI';

// eslint-disable-next-line consistent-return
async function getWeatherData(location) {
  try {
    const weatherApiKey = '0ac45c72a4d354033e9bdebe3289626b';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherApiKey}&units=metric`;
    const response = await fetch(url, { mode: 'cors' });
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error: ', error);
  }
}
const cityForm = document.querySelector('form');
const cityInput = document.querySelector('input');

cityForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (validateForm(cityForm, cityInput)) {
    document.querySelector('.loader').classList.toggle('visible');
    getWeatherData(cityInput.value).then((weatherData) => {
      if (Object.hasOwn(weatherData, 'name')) {
        cityInput.placeholder = weatherData.name;
      }
      updateInfo(weatherData);
      document.querySelector('.loader').classList.toggle('visible');
    });
  }
});

getWeatherData('toronto').then((weatherData) => {
  updateInfo(weatherData);
});
