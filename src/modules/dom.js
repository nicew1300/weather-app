import { fetchWeatherData } from './logic';

function makeDiv(className) {
  const div = document.createElement('div');
  div.classList.add(className);
  return div;
}

async function renderWeatherData(city) {
  try {
    const data = await fetchWeatherData(city);
    console.log(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

export { renderWeatherData };
