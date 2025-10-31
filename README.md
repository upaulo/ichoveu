# Ichoveu

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## Link

## [ichoveu.vercel](https://paulo-ichoveu.vercel.app/)

## Preview

![Preview of Ichoveu](./ichoveu.png)

## About

This is my 13th project during my journey at Trybe!

[Weather API](https://www.weatherapi.com/docs/) is a fully-managed REST API offering real-time, forecast, historical and geolocation weather data (including air quality, astronomy, marine conditions and more) in JSON or XML format worldwide!

## Repository Structure

- The `src` folder contains all the code

## Implemented Features

### API Consumption

  - The application consumes the [Weather API](https://www.weatherapi.com/docs/) and uses the .JSON response to display a weather card:

    - The cards contain the **city name**, **country**, a short description of the current weather condition, the temperature in **Celsius**, and a button to view the **forecast**
    - The forecast displays the **next 3 days**, including their **maximum and minimum** temperatures and a brief description of the weather condition

  - The consumed endpoint is `'https://api.weatherapi.com/v1/search.json?lang=pt&key=TOKEN&q=city'` where **'token'** is your unique and individual API key that you can obtain from their website following the documentation, and **'city'** is the searched city

---

### Swal Library

  - [Swal](https://sweetalert2.github.io/) is an abbreviation used to refer to SweetAlert, a library that facilitates the creation of highly customizable and visually appealing dialog modals

---
