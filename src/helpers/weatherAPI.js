import Swal from 'sweetalert2';

const TOKEN = import.meta.env.VITE_TOKEN;

export const searchCities = async (city) => {
	const URL = `https://api.weatherapi.com/v1/search.json?lang=pt&key=${TOKEN}&q=${city}`;

	try {
		const response = await fetch(URL);
		const result = await response.json();

		if (result.length > 0) return result;

		Swal.fire({
			title: 'No cities found',
			text: 'Try another name',
			icon: 'error',
			confirmButtonText: 'OK',
			confirmButtonColor: '#0097db',
		});

		return [];
	} catch (error) {
		Swal.fire({
			title: 'An error occurred when searching for cities',
			text: error.message,
			icon: 'error',
			confirmButtonText: 'OK',
			confirmButtonColor: '#0097db',
		});

		return [];
	}
};

export const getWeatherByCity = async (cityURL) => {
	const URL = `https://api.weatherapi.com/v1/current.json?lang=pt&key=${TOKEN}&q=${cityURL}`;

	try {
		const response = await fetch(URL);
		const result = await response.json();

		const { temp_c: temp, condition } = result.current;
		return { temp, condition: condition.text, icon: condition.icon };
	} catch (error) {
		Swal.fire({
			title: 'An error occurred while obtaining weather information for the city',
			text: error.message,
			icon: 'error',
			confirmButtonText: 'OK',
			confirmButtonColor: '#0097db',
		});

		return null;
	}
};

export const getForecastByCity = async (cityURL) => {
	const DAYS = 7;
	const URL = `https://api.weatherapi.com/v1/forecast.json?lang=pt&key=${TOKEN}&q=${cityURL}&days=${DAYS}`;

	const response = await fetch(URL);
	const result = await response.json();

	const forecastList = result.forecast.forecastday.map((day) => ({
		date: day.date,
		maxTemp: day.day.maxtemp_c,
		minTemp: day.day.mintemp_c,
		condition: day.day.condition.text,
		icon: day.day.condition.icon,
	}));

	return forecastList;
};
