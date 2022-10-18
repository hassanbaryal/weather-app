import fromUnixTime from 'date-fns/fromUnixTime';
import misty from '../assets/images/align-center.svg';
import drizzle from '../assets/images/cloud-drizzle.svg';
import lightning from '../assets/images/cloud-lightning.svg';
import rain from '../assets/images/cloud-rain.svg';
import snow from '../assets/images/cloud-snow.svg';
import cloud from '../assets/images/cloud.svg';
import moon from '../assets/images/moon.svg';
import sun from '../assets/images/sun.svg';
import xMark from '../assets/images/x.svg';

function updateWeatherIcon (icon = 'x') {
  const weatherIcon = document.querySelector('.weather-desc img');

  if (icon === '01d') {
    // Sunny
    weatherIcon.src = sun;
  } else if (icon === '01n') {
    // Night / moon visible
    weatherIcon.src = moon;
  } else if (icon === '02d' || icon === '02n' || icon === '03d' || icon === '03n' || icon === '04d' || icon === '04n') {
    // Cloudy
    weatherIcon.src = cloud;
  } else if (icon === '09d' || icon === '09n') {
    // Rain
    weatherIcon.src = rain;
  } else if (icon === '10d' || icon === '10n') {
    // Drizzle
    weatherIcon.src = drizzle;
  } else if (icon === '11d' || icon === '11n') {
    // Lightning
    weatherIcon.src = lightning;
  } else if (icon === '13d' || icon === '13n') {
    // Snow
    weatherIcon.src = snow;
  } else if (icon === '50d' || icon === '50n') {
    // Mist
    weatherIcon.src = misty;
  } else {
    // X Mark
    weatherIcon.src = xMark;
  }
}

export default function updateInfo(data) {
  const cityName = document.querySelector('.city-name');
  const cityTime = document.querySelector('.city-time');
  const temperature = document.querySelector('.temperature-num');
  const weatherDescription = document.querySelector('.description');
  if (Object.hasOwn(data, 'name')) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    const time = fromUnixTime((data.dt + data.timezone));
    cityTime.textContent = time;
    temperature.textContent = `${Math.round(data.main.temp)}`;
    weatherDescription.textContent = `${data.weather[0].description.toUpperCase()}`;
    updateWeatherIcon(data.weather[0].icon);
  } else {
    cityName.textContent = `${data.message}`;
    updateWeatherIcon();
    cityTime.textContent = '';
    temperature.textContent = '';
    weatherDescription.textContent = '';
  }
}
