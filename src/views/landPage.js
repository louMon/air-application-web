import { landbar, landpage } from '../lib/HtmlComponents.js';
import { goTo } from '../lib/viewController.js';

const landPage = () => {
  const landElem = document.createElement('div');
  const menuNavBar = document.querySelector('header');

  menuNavBar.innerHTML = landbar;
  landElem.innerHTML = landpage;
  landElem.querySelector('#historical_interpolation').addEventListener('click', () => goTo('spatial_historical'));
  landElem.querySelector('#future_interpolation').addEventListener('click', () => goTo('future_interpolation'));
  landElem.querySelector('#forecasting').addEventListener('click', () => goTo('forecasting'));
  return landElem;
};

export { landPage };