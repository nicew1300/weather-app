import { fetchWeatherData } from './logic';
import weatherSvg from '../svgs/title.svg';
import partlyCloudySvg from '../svgs/partly-cloudy.svg';
import cloudySvg from '../svgs/cloudy.svg';
import nightSvg from '../svgs/night.svg';
import sunnySvg from '../svgs/sunny.svg';
import rainySvg from '../svgs/rain.svg';
import stormSvg from '../svgs/storm.svg';

const weatherIcons = {
  partlyCloudy: partlyCloudySvg,
  cloudy: cloudySvg,
  night: nightSvg,
  sunny: sunnySvg,
  rainy: rainySvg,
  storm: stormSvg,
};

const iconByApiId = {
  'clear-day': sunnySvg,
  'clear-night': nightSvg,
  'partly-cloudy-day': partlyCloudySvg,
  'partly-cloudy-night': partlyCloudySvg,
  cloudy: cloudySvg,
  rain: rainySvg,
  'showers-day': rainySvg,
  'showers-night': rainySvg,
  'thunder-rain': stormSvg,
  'thunder-showers-day': stormSvg,
  'thunder-showers-night': stormSvg,
  snow: cloudySvg,
  fog: cloudySvg,
  wind: cloudySvg,
};

function getIconSrc(apiIcon) {
  return iconByApiId[apiIcon] ?? partlyCloudySvg;
}

function makeEle(element, className) {
  const el = document.createElement(element);
  el.classList.add(className);
  return el;
}

let tempUnit = 'C';
// we need lastSearchedCity to be able to re-render the weather data when the user changes the temperature unit without having to search for the city again, basically it just searches for the user again
let lastSearchedCity = '';

function renderSite() {
  // this function looks insane, i truly do hope someone made a framework for this type of stuff that is called React or something, i wonder if it exists yet
  // should have split this into smaller functions
  const wrapper = makeEle('div', 'wrapper');
  document.body.appendChild(wrapper);

  const headerDiv = makeEle('div', 'header');
  const errorDiv = makeEle('div', 'error-div');

  const titleDiv = makeEle('div', 'title');
  const titleText = makeEle('h1', 'title-text');
  titleText.textContent = 'Weather App';

  const titleIcon = makeEle('img', 'title-icon');
  titleIcon.src = weatherSvg;
  titleIcon.alt = 'Weather Icon';

  const cityInputContainer = makeEle('div', 'city-input-container');
  const cityInput = makeEle('input', 'city-input');
  cityInput.type = 'text';
  cityInput.placeholder = 'Enter city name';
  cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const city = e.target.value.trim();
      if (city) {
        lastSearchedCity = city;
        renderWeatherData(city, errorDiv, tempUnit);
      }
    }
  });

  const searchButton = makeEle('button', 'search-button');
  searchButton.textContent = 'Search';
  searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
      lastSearchedCity = city;
      renderWeatherData(city, errorDiv, tempUnit);
    }
  });

  const tempSwitchContainer = makeEle('div', 'temp-switch-container');
  const tempCBtn = makeEle('button', 'temp-cbtn');
  tempCBtn.classList.add('active', 'temp-switch');
  tempCBtn.textContent = '°C';

  const tempFBtn = makeEle('button', 'temp-fbtn');
  tempFBtn.classList.add('temp-switch', 'inactive');
  tempFBtn.textContent = '°F';

  tempCBtn.addEventListener('click', () => {
    tempCBtn.classList.add('active');
    tempCBtn.classList.remove('inactive');
    tempFBtn.classList.remove('active');
    tempFBtn.classList.add('inactive');
    tempUnit = 'C';
    if (lastSearchedCity) {
      renderWeatherData(lastSearchedCity, errorDiv, tempUnit);
    }
  });

  tempFBtn.addEventListener('click', () => {
    tempFBtn.classList.add('active');
    tempFBtn.classList.remove('inactive');
    tempCBtn.classList.remove('active');
    tempCBtn.classList.add('inactive');
    tempUnit = 'F';
    if (lastSearchedCity) {
      renderWeatherData(lastSearchedCity, errorDiv, tempUnit);
    }
  });

  const contentDiv = makeEle('div', 'content');

  // CW stands for currentWeather
  const CWCont = makeEle('div', 'CW-container');
  const CWIcon = makeEle('img', 'CW-icon');
  const CWTemp = makeEle('div', 'CW-temp');
  const CWConditions = makeEle('div', 'CW-conditions');
  const CWFeelsLike = makeEle('div', 'CW-feelslike');
  const CWWindSpeed = makeEle('div', 'CW-wind-speed');
  const CWLastUpdate = makeEle('div', 'CW-last-update');
  CWCont.style.display = 'none';

  const nextDaysContainer = makeEle('div', 'next-days-container');
  const nextDaysDiv1 = makeEle('div', 'next-day');
  const nextDaysDiv2 = makeEle('div', 'next-day');
  const nextDaysDiv3 = makeEle('div', 'next-day');
  const nextDaysDiv4 = makeEle('div', 'next-day');
  const nextDaysDiv5 = makeEle('div', 'next-day');
  nextDaysContainer.style.display = 'none';

  const nextDaysDivs = [
    nextDaysDiv1,
    nextDaysDiv2,
    nextDaysDiv3,
    nextDaysDiv4,
    nextDaysDiv5,
  ];

  nextDaysDivs.forEach((nextDaysDiv) => {
    const nextDayDate = makeEle('div', 'next-day-date');
    const nextDayIcon = makeEle('img', 'next-day-icon');
    const nextDayTemp = makeEle('div', 'next-day-temp');
    const nextDayConditions = makeEle('div', 'next-day-conditions');
    const nextDayWindSpeed = makeEle('div', 'next-day-wind-speed');

    nextDaysDiv.appendChild(nextDayDate);
    nextDaysDiv.appendChild(nextDayIcon);
    nextDaysDiv.appendChild(nextDayConditions);
    nextDaysDiv.appendChild(nextDayTemp);
    nextDaysDiv.appendChild(nextDayWindSpeed);
    nextDaysContainer.appendChild(nextDaysDiv);
  });

  // holy appending
  titleDiv.appendChild(titleText);
  titleDiv.appendChild(titleIcon);
  headerDiv.appendChild(titleDiv);
  cityInputContainer.appendChild(cityInput);
  cityInputContainer.appendChild(searchButton);
  headerDiv.appendChild(cityInputContainer);
  tempSwitchContainer.appendChild(tempCBtn);
  tempSwitchContainer.appendChild(tempFBtn);
  headerDiv.appendChild(tempSwitchContainer);
  CWCont.appendChild(CWIcon);
  CWCont.appendChild(CWTemp);
  CWCont.appendChild(CWConditions);
  CWCont.appendChild(CWFeelsLike);
  CWCont.appendChild(CWWindSpeed);
  CWCont.appendChild(CWLastUpdate);
  contentDiv.appendChild(CWCont);
  contentDiv.appendChild(nextDaysContainer);
  wrapper.appendChild(headerDiv);
  wrapper.appendChild(contentDiv);
  headerDiv.appendChild(errorDiv);
}

async function renderWeatherData(city, errorDiv, tempUnit) {
  try {
    const CWContainer = document.querySelector('.CW-container');
    CWContainer.classList.add('loading');
    const CW = (await fetchWeatherData(city)).currentWeather;
    const CWIcon = document.querySelector('.CW-icon');
    const CWConditions = document.querySelector('.CW-conditions');
    const CWTemp = document.querySelector('.CW-temp');
    const CWFeelsLike = document.querySelector('.CW-feelslike');
    const CWWindSpeed = document.querySelector('.CW-wind-speed');
    const CWLastUpdate = document.querySelector('.CW-last-update');

    CW.temp = tempUnit === 'C' ? CW.temp : (CW.temp * (9 / 5) + 32).toFixed(1);
    CW.feelsLike =
      tempUnit === 'C'
        ? CW.feelsLike
        : (CW.feelsLike * (9 / 5) + 32).toFixed(1);

    CWIcon.src = getIconSrc(CW.icon);
    CWConditions.textContent = `Conditions: ${CW.conditions}`;
    CWTemp.textContent = `Temperature: ${CW.temp}°${tempUnit}`;
    CWFeelsLike.textContent = `Feels Like: ${CW.feelsLike}°${tempUnit}`;
    CWWindSpeed.textContent = `Wind Speed: ${CW.windSpeed} km/h`;
    CWLastUpdate.textContent = `Last Update: ${CW.lastUpdate}`;
    errorDiv.textContent = '';
    CWContainer.style.display = 'grid';
    CWContainer.classList.remove('loading');

    const nextDaysContainer = document.querySelector('.next-days-container');
    const nextDaysDivs = document.querySelectorAll('.next-day');
    const nextDays = (await fetchWeatherData(city)).nextDays;

    nextDays.forEach((day, index) => {
      const nextDayDate = nextDaysDivs[index].querySelector('.next-day-date');
      const nextDayIcon = nextDaysDivs[index].querySelector('.next-day-icon');
      const nextDayTemp = nextDaysDivs[index].querySelector('.next-day-temp');
      const nextDayConditions = nextDaysDivs[index].querySelector(
        '.next-day-conditions',
      );
      const nextDayWindSpeed = nextDaysDivs[index].querySelector(
        '.next-day-wind-speed',
      );

      day.temp =
        tempUnit === 'C' ? day.temp : (day.temp * (9 / 5) + 32).toFixed(1);
      day.feelsLike =
        tempUnit === 'C'
          ? day.feelsLike
          : (day.feelsLike * (9 / 5) + 32).toFixed(1);
      day.windspeed = day.windspeed.toFixed(1);

      nextDayDate.textContent = day.date;
      nextDayIcon.src = getIconSrc(day.icon);
      nextDayConditions.textContent = `Condition: ${day.conditions}`;
      nextDayTemp.textContent = `Temp: ${day.temp}°${tempUnit}`;
      nextDayWindSpeed.textContent = `Wind Speed: ${day.windspeed} km/h`;
    });
    nextDaysContainer.style.display = 'grid';
    nextDaysContainer.classList.remove('loading');
  } catch (error) {
    errorDiv.textContent = error.message;
    console.error(error);
  }
}

export { renderWeatherData, renderSite };
