const API_KEY = 'EEAERHP88HY4F9QBFMKK9JT4W';
const BASE_URL =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

async function fetchWeatherData(city) {
  const response = await fetch(BASE_URL + `${city}?key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  const data = await response.json();
  return data;
}
export { fetchWeatherData };
