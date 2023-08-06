const locationForm = document.getElementById('location-form');
const locationInput = document.getElementById('location-input');
const weatherDataContainer = document.getElementById('weather-data');
const weatherInfo = document.getElementById('weather-info');
const loadingIndicator = document.getElementById('loading');

locationForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const location = locationInput.value;
  try {
    showLoading();
    const weatherData = await getWeatherData(location);
    hideLoading();
    const processedData = processWeatherData(weatherData);
    displayWeatherInfo(processedData);
  } catch (error) {
    hideLoading();
    console.error('Error fetching weather data:', error);
  }
});

function getWeatherData(location) {
  const apiKey = '83575693c1aebdec48635f809bc00eda'; // Replace with your actual API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  return new Promise((resolve, reject) => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}


function processWeatherData(data) {
    console.log(data);
  return {
    location: data.name,
    temperature: data.main.temp,
    description: data.weather[0].description,
    icon: data.weather[0].icon
  };
}


function displayWeatherInfo(data) {
  weatherInfo.innerHTML = `
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Temperature:</strong> ${data.temperature}°C</p>
    <p><strong>Description:</strong> ${data.description}</p>
    <img src="http://openweathermap.org/img/w/${data.icon}.png" alt="Weather Icon">
  `;
  weatherDataContainer.classList.remove('hidden');
}

function showLoading() {
  loadingIndicator.classList.remove('hidden');
}

function hideLoading() {
  loadingIndicator.classList.add('hidden');
}
