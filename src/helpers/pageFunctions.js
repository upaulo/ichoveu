import {
	getForecastByCity,
	getWeatherByCity,
	searchCities,
} from "./weatherAPI";

function createElement(tagName, className, textContent = "") {
	const element = document.createElement(tagName);
	element.classList.add(...className.split(" "));
	element.textContent = textContent;
	return element;
}

function clearChildrenById(elementId) {
	const citiesList = document.getElementById(elementId);
	while (citiesList.firstChild) {
		citiesList.removeChild(citiesList.firstChild);
	}
}

function createHeadingContainer(name, country) {
	const headingContainer = createElement("div", "city-heading");
	const nameElement = createElement("h2", "city-name", name);
	const countryElement = createElement("p", "city-country", country);
	headingContainer.appendChild(nameElement);
	headingContainer.appendChild(countryElement);
	return headingContainer;
}

function createWeatherContainer(temp, condition) {
	const weatherContainer = createElement("div", "city-weather-container");
	const tempElement = createElement("p", "city-temp", `${temp}º`);
	const conditionElement = createElement("p", "city-condition", condition);
	weatherContainer.appendChild(conditionElement);
	weatherContainer.appendChild(tempElement);
	return weatherContainer;
}

function createIconElement(icon) {
	const iconElement = createElement("img", "weather-icon");
	iconElement.src = icon.replace("64x64", "128x128");
	return iconElement;
}

function createForecast(forecast) {
	const { date, maxTemp, minTemp, condition, icon } = forecast;

	const weekday = new Date(date);
	weekday.setDate(weekday.getDate() + 1);
	const weekdayName = weekday.toLocaleDateString("pt-BR", { weekday: "short" });

	const forecastElement = createElement("div", "forecast");
	const dateElement = createElement("p", "forecast-weekday", weekdayName);

	const maxElement = createElement("span", "forecast-temp max", "max");
	const maxTempElement = createElement(
		"span",
		"forecast-temp max",
		`${maxTemp}º`,
	);
	const minElement = createElement("span", "forecast-temp min", "min");
	const minTempElement = createElement(
		"span",
		"forecast-temp min",
		`${minTemp}º`,
	);
	const tempContainer = createElement("div", "forecast-temp-container");
	tempContainer.appendChild(maxElement);
	tempContainer.appendChild(minElement);
	tempContainer.appendChild(maxTempElement);
	tempContainer.appendChild(minTempElement);

	const conditionElement = createElement("p", "forecast-condition", condition);
	const iconElement = createElement("img", "forecast-icon");
	iconElement.src = icon.replace("64x64", "128x128");

	const middleContainer = createElement("div", "forecast-middle-container");
	middleContainer.appendChild(tempContainer);
	middleContainer.appendChild(iconElement);

	forecastElement.appendChild(dateElement);
	forecastElement.appendChild(middleContainer);
	forecastElement.appendChild(conditionElement);

	return forecastElement;
}

function showForecast(forecastList) {
	const overlay = document.getElementById("overlay");
	const forecastContainer = document.getElementById("forecast-container");
	const weekdaysContainer = document.getElementById("weekdays");
	const closeButton = document.getElementById("close-forecast");

	clearChildrenById("weekdays");

	forecastList.forEach((forecast) => {
		const weekdayElement = createForecast(forecast);
		weekdaysContainer.appendChild(weekdayElement);
	});

	forecastContainer.classList.remove("hidden");
	overlay.classList.remove("hidden");
	overlay.classList.add("show");

	closeButton.addEventListener("click", () => {
		forecastContainer.classList.add("hidden");
		overlay.classList.remove("show");
		overlay.classList.add("hidden");
	});

	window.addEventListener("click", (event) => {
		if (!forecastContainer.contains(event.target)) {
			forecastContainer.classList.add("hidden");
			overlay.classList.remove("show");
			overlay.classList.add("hidden");
		}
	});
}

function createButtonElement(url) {
	const forecastButton = createElement(
		"button",
		"city-forecast-button",
		"Ver previsão",
	);

	forecastButton.addEventListener("click", async () => {
		const result = await getForecastByCity(url);
		showForecast(result);
	});
	return forecastButton;
}

function createCityElement(cityInfo) {
	const { name, country, temp, condition, icon, url } = cityInfo;

	const cityElement = createElement("li", "city");

	const headingContainer = createHeadingContainer(name, country);
	const weatherContainer = createWeatherContainer(temp, condition);
	const iconElement = createIconElement(icon);
	const forecastButton = createButtonElement(url);

	const infoContainer = createElement("div", "city-info-container");
	infoContainer.appendChild(weatherContainer);
	infoContainer.appendChild(iconElement);

	cityElement.appendChild(headingContainer);
	cityElement.appendChild(infoContainer);
	cityElement.appendChild(forecastButton);

	return cityElement;
}

export default async function handleSearch(event) {
	event.preventDefault();
	clearChildrenById("cities");

	const searchInput = document.getElementById("search-input");
	const searchValue = searchInput.value;

	const cities = await searchCities(searchValue);

	const citiesWeather = cities.map(async (city) => {
		const weatherInfo = await getWeatherByCity(city.url);
		const { temp, condition, icon } = weatherInfo;
		return {
			name: city.name,
			country: city.country,
			temp,
			condition,
			icon,
			url: city.url,
		};
	});

	const weatherData = await Promise.all(citiesWeather);

	const infoTitle = document.getElementById("info");
	const citiesList = document.getElementById("cities");

	infoTitle.textContent = `Exibindo resultados para "${searchValue}"`;

	weatherData.forEach((cityInfo) => {
		const cityElement = createCityElement(cityInfo);
		citiesList.appendChild(cityElement);
	});
	searchInput.value = "";
}
