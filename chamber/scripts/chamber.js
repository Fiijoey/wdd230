const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");
const navLinks = document.querySelectorAll(".nav-link");
const currentURL = window.location.pathname;

navLinks.forEach((link) => {
  if ("/chamber/" + link.getAttribute("href") === currentURL) {
    link.classList.add("active");
  }

  link.addEventListener("click", function () {
    const activeLink = document.querySelector(".active");
    if (activeLink) {
      activeLink.classList.remove("active");
    }
    this.classList.add("active");
  });
});

hamButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
  hamButton.classList.toggle("open");
});

const date = new Date();
const form = new Intl.DateTimeFormat("en-us", {
  dateStyle: "full",
  timeStyle: "short",
});

/** DISPLAY WEATHER */
const latitude = 5.55;
const longitude = 0.19;
const apiKey = "9cafa123f783487bdb6face6f1d55796";
const forecastKey = "b07142610edb5043effd6a3b6ffcb5fc";
const currentTemp = document.querySelector("#current-temp");
const currentDesc = document.querySelector("figcaption");
const figure = document.querySelector("#currentIcon");

const url0 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;


async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      displayForecast(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}
async function forecastFetch() {
  try {
    const response = await fetch(url0);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

apiFetch();
forecastFetch();

function displayResults(data) {
  const currentIcon = document.createElement("img");
  currentTemp.innerHTML = `${data.main.temp}&deg;C`;
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  let desc = data.weather[0].description;
  currentIcon.setAttribute("loading", "lazy");
  currentIcon.setAttribute("alt", "weather icon");
  currentIcon.setAttribute("width", "70");
  currentIcon.setAttribute("height", "70");
  currentIcon.setAttribute("src", `${iconsrc}`);
  currentDesc.textContent = `${desc}`;

  figure.appendChild(currentIcon);
}


function displayForecast(data) {
  const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];



  const tomorrowTemp = document.querySelector("#tomorrow-temp");
  const dayAfterTomorrowTemp = document.querySelector("#day-after-temp");
  const dayFourTemp = document.querySelector("#day-four-temp");

  const tomorrow = new Date(data.list[8].dt * 1000).getDay();
  console.log(tomorrow);
  const dayAfterTomorrow = new Date(data.list[16].dt * 1000).getDay();
  console.log(dayAfterTomorrow);
  const dayFour = new Date(data.list[24].dt * 1000).getDay();
  console.log(dayFour);

  tomorrowTemp.innerHTML = `${daysOfTheWeek[tomorrow]}: ${data.list[8].main.temp}&deg;C`;
  dayAfterTomorrowTemp.innerHTML = `${daysOfTheWeek[dayAfterTomorrow]}: ${data.list[16].main.temp}&deg;C`;
  dayFourTemp.innerHTML = `${daysOfTheWeek[dayFour]}: ${data.list[24].main.temp}&deg;C`;

}


var year = date.getFullYear();
var modifiedt = form.format(new Date(document.lastModified));

document.getElementById("currentyear").innerHTML = year;

function generateCalendar(year, month) {
  const calendar = document.getElementById("calendar");
  const date = new Date(year, month);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  let table =
    "<table><thead><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr></thead><tbody><tr>";

  for (let i = 0; i < firstDay; i++) {
    table += "<td></td>";
  }

  for (let day = 1; day <= daysInMonth; day++) {
    if ((firstDay + day - 1) % 7 === 0 && day !== 1) {
      table += "</tr><tr>";
    }
    table += `<td>${day}</td>`;
  }

  table += "</tr></tbody></table>";
  if (calendar) {
    calendar.innerHTML = table;
  }
}

const today = new Date();
generateCalendar(today.getFullYear(), today.getMonth());

/** TRACK VISITS */

const sidebar = document.getElementById("track-visit");
const lastVisit = localStorage.getItem("lastVisit");
const currentVisit = Date.now();

if (!lastVisit) {
  sidebar.innerHTML = "<p>Welcome! Let us know if you have any questions.</p>";
} else {
  const timeDifference = currentVisit - lastVisit;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (daysDifference < 1) {
    if (sidebar) {
      sidebar.innerHTML = "<p>Back so soon! Awesome!</p>";
    }
  } else if (daysDifference === 1) {
    sidebar.innerHTML = `<p>You last visited 1 day ago.</p>`;
  } else {
    sidebar.innerHTML = `<p>You last visited ${daysDifference} days ago.</p>`;
  }
}

localStorage.setItem("lastVisit", currentVisit);

/** CREATE AND POPULATE THE DIRECTORY CARDS */
const baseURL = "https://fiijoey.github.io/wdd230/chamber/";
const membersUrl = "https://fiijoey.github.io/wdd230/chamber/data/members.json";
const cards = document.getElementById("directory");
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");

async function getDirectoryData() {
  const response = await fetch(membersUrl);
  const data = await response.json();
  console.log(data);
  displayDirectory(data.members);
}

getDirectoryData();

const displayDirectory = (members) => {
  members.forEach((member) => {
    let card = document.createElement("section");
    let logo = document.createElement("img");
    let fullName = document.createElement("h3");
    let address = document.createElement("p");
    let phone = document.createElement("p");
    let website = document.createElement("a");
    let membership_level = document.createElement("h2");

    fullName.textContent = `${member.name}`;
    address.textContent = `${member.address}`;
    phone.textContent = `${member.phone}`;
    website.textContent = `${member.website}`;
    membership_level.textContent = `${member.membership_level}`;

    website.setAttribute("href", member.website);
    logo.setAttribute("src", member.image);
    logo.setAttribute("alt", `Picture of ${member.name}`);
    logo.setAttribute("loading", "lazy");
    logo.setAttribute("width", "100");
    logo.setAttribute("height", "100");

    card.appendChild(logo);
    card.appendChild(fullName);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(website);
    card.appendChild(membership_level);

    cards.appendChild(card);
  });
};

gridbutton.addEventListener("click", () => {
  cards.classList.add("grid");
  cards.classList.remove("list");
  cards.classList.remove("default");
});

listbutton.addEventListener("click", showList);

function showList() {
  cards.classList.add("list");
  cards.classList.remove("grid");
  cards.classList.remove("default");
}
