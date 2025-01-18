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
const iList = document.querySelector("ul");

modeButton.addEventListener("click", () => {
  if (modeButton.textContent.includes("🕶️")) {
    main.style.background = "#000";
    main.style.color = "#fff";
    iList.style.color = "#fff";
    modeButton.textContent = "🔆";
  } else {
    main.style.background = "#eee";
    main.style.color = "#000";
    modeButton.textContent = "🕶️";
  }
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
