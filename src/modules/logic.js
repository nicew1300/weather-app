const API_KEY = 'EEAERHP88HY4F9QBFMKK9JT4W';
const BASE_URL =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

async function fetchWeatherData(city) {
  const response = await fetch(
    BASE_URL + `${city}?key=${API_KEY}&unitGroup=metric`,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  const data = await response.json();
  const address = toTitleCase(data.resolvedAddress);
  const currentWeather = {
    temp: data.currentConditions.temp,
    feelsLike: data.currentConditions.feelslike,
    conditions: toTitleCase(data.currentConditions.conditions),
    icon: data.currentConditions.icon,
    windSpeed: data.currentConditions.windspeed,
    lastUpdate: data.currentConditions.datetime,
  };

  const nextDays = data.days.slice(1, 6).map((day) => ({
    date: day.datetime,
    temp: day.temp,
    conditions: toTitleCase(day.conditions),
    windspeed: day.windspeed,
    icon: day.icon,
  }));
  return { data, currentWeather, address, nextDays };
}
export { fetchWeatherData };
