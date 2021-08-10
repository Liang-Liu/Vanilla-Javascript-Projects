import SVG from "./svg.js";

let city = "Vancouver";

const formEl = document.querySelector("form");
const inputEl = document.querySelector("input");

formEl.addEventListener("submit", (e) => {
	e.preventDefault();
	city = inputEl.value;
	fetchCityId(city);
	inputEl.value = "";
});

const h2El = document.querySelector("h2");
const h1El = document.querySelector("h1");
const spanEl = document.querySelector("span");
const mainEl = document.querySelector("main");

const APIURL =
	"https://api.allorigins.win/raw?url=https://www.metaweather.com/";
const citySearchURL = `api/location/search/?query=`;
const cityWeatherURL = `api/location/`;

fetchCityId(city);

async function fetchCityId(city) {
	const resp = await fetch(APIURL + citySearchURL + city);
	const respData = await resp.json();

	fetchCityWeatherById(respData[0].woeid);
}

async function fetchCityWeatherById(woeid) {
	const resp = await fetch(APIURL + cityWeatherURL + woeid);
	const respData = await resp.json();

	loadWeather(respData);
}

function loadWeather(respData) {
	h2El.innerHTML = respData.title;

	const weatherInfo = respData.consolidated_weather;
	h1El.innerHTML = `${Math.round(weatherInfo[0].the_temp)}°C`;
	spanEl.innerHTML = weatherInfo[0].weather_state_name;

	mainEl.innerHTML = "";

	weatherInfo.slice(1, 6).forEach((ele) => {
		const dayEl = document.createElement("div");
		dayEl.classList.add("day");
		dayEl.innerHTML = `
			<h5 class="date">${ele.applicable_date.slice(5, 10)}</h5>
			<h5 class="degree">${Math.round(ele.the_temp)}°C</h5>
			${SVG[ele.weather_state_abbr]}
		`;

		mainEl.appendChild(dayEl);
	});
}
