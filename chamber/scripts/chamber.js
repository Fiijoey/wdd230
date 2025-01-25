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
  calendar.innerHTML = table;
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
    sidebar.innerHTML = "<p>Back so soon! Awesome!</p>";
  } else if (daysDifference === 1) {
    sidebar.innerHTML = `<p>You last visited 1 day ago.</p>`;
  } else {
    sidebar.innerHTML = `<p>You last visited ${daysDifference} days ago.</p>`;
  }
}

localStorage.setItem("lastVisit", currentVisit);
