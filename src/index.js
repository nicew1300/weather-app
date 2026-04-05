// import { fetchWeatherData } from './modules/logic.js';
import { renderWeatherData } from './modules/dom.js';
import { renderSite } from './modules/dom.js';
import { getLocation } from './modules/dom.js';
import './styles/global.css';

renderWeatherData('New York');
renderSite();
getLocation();
