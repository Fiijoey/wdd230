const currentTemp = document.querySelector("#current-temp");
const currentIcon = document.querySelector("#weather-icon");
const currentDesc = document.querySelector("figcaption");

const url =
  "https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.65&units=imperal&appid=9cafa123f783487bdb6face6f1d55796";

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      //console.log(data);
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

apiFetch();

function displayResults(data) {
  currentTemp.innerHTML = `${data.main.temp}&deg;F`;
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  let desc = data.weather[0].description;
  currentIcon.setAttribute("loading", "lazy");
  currentIcon.setAttribute("alt", "weather icon");
  currentIcon.setAttribute("width", "100");
  currentIcon.setAttribute("height", "100");
  currentIcon.setAttribute("src", `${iconsrc}`);
  currentDesc.textContent = `${desc}`;
}
