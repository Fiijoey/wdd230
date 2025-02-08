document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Remove active class from all nav items
      navItems.forEach((nav) => nav.classList.remove("active"));
      // Add active class to the clicked nav item
      item.classList.add("active");
    });
  });
});

const modeButton = document.querySelector("#mode");
const main = document.querySelector("main");
const iList = document.querySelector("#card");

modeButton.addEventListener("click", () => {
  if (modeButton.textContent.includes("🕶️")) {
    main.style.background = "#000";
    main.style.color = "#fff";
    iList.style.background = "#fff";
    modeButton.textContent = "🔆";
  } else {
    main.style.background = "#eee";
    main.style.color = "#000";
    modeButton.textContent = "🕶️";
  }
});

const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

hamButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
  hamButton.classList.toggle("open");
});

const date = new Date();
const form = new Intl.DateTimeFormat("en-us", {
  dateStyle: "full",
  timeStyle: "short",
});
var year = date.getFullYear();
var modifiedt = form.format(new Date(document.lastModified));

document.getElementById("currentyear").innerHTML = year;
document.getElementById("lastModified").innerHTML = modifiedt;

const currentTemp = document.querySelector("#current-temp");
const currentDesc = document.querySelector("figcaption");
const figure = document.querySelector("#currentIcon");

const url =
  "https://api.openweathermap.org/data/2.5/weather?lat=5.55&lon=0.19&appid=9cafa123f783487bdb6face6f1d55796&units=metric";

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
  const currentIcon = document.createElement("img");
  currentTemp.innerHTML = `${data.main.temp}&deg;C`;
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  let desc = data.weather[0].description;
  currentIcon.setAttribute("loading", "lazy");
  currentIcon.setAttribute("alt", "weather icon");
  currentIcon.setAttribute("width", "50");
  currentIcon.setAttribute("height", "50");
  currentIcon.setAttribute("src", `${iconsrc}`);
  currentDesc.textContent = `${desc}`;

  figure.appendChild(currentIcon);
}

if (localStorage.getItem("visitCount")) {
  localStorage.setItem(
    "visitCount",
    Number(localStorage.getItem("visitCount")) + 1
  );
} else {
  localStorage.setItem("visitCount", 1);
}
document.querySelector(".numberofVisit").textContent =
  localStorage.getItem("visitCount");
