const date = new Date();
const form = new Intl.DateTimeFormat("en-us", {
  dateStyle: "full",
  timeStyle: "short",
});
var year = date.getFullYear();
var modifiedt = form.format(new Date(document.lastModified));

document.getElementById("currentyear").innerHTML = year;
document.getElementById("lastModified").innerHTML = modifiedt;
