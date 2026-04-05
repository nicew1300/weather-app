import { fetchWeatherData } from './logic';
import weatherSvg from '../svg/weather-svg.svg';

function makeEle(element, className) {
  const el = document.createElement(element);
  el.classList.add(className);
  return el;
}

function renderSite() {
  const headerDiv = makeEle('div', 'header');

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

  const searchButton = makeEle('button', 'search-button');
  searchButton.textContent = 'Search';

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
  });

  tempFBtn.addEventListener('click', () => {
    tempFBtn.classList.add('active');
    tempFBtn.classList.remove('inactive');
    tempCBtn.classList.remove('active');
    tempCBtn.classList.add('inactive');
  });

  const contentDiv = makeEle('div', 'content');

  titleDiv.appendChild(titleText);
  titleDiv.appendChild(titleIcon);
  headerDiv.appendChild(titleDiv);
  cityInputContainer.appendChild(cityInput);
  cityInputContainer.appendChild(searchButton);
  headerDiv.appendChild(cityInputContainer);
  tempSwitchContainer.appendChild(tempCBtn);
  tempSwitchContainer.appendChild(tempFBtn);
  headerDiv.appendChild(tempSwitchContainer);
  document.body.appendChild(headerDiv);
  document.body.appendChild(contentDiv);
}

function getLocation() {
  document.querySelector('.city-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const city = e.target.value.trim();
      if (city) {
        renderWeatherData(city);
      }
    }
  });

  document.querySelector('.search-button').addEventListener('click', () => {
    const city = document.querySelector('.city-input').value;
    if (city) {
      renderWeatherData(city);
    }
  });
}

async function renderWeatherData(city) {
  try {
    const data = await fetchWeatherData(city);
    console.log(data);
  } catch (error) {
    console.error('Error in fetchWeatherData:', error);
  }
}

export { renderWeatherData, renderSite, getLocation };
