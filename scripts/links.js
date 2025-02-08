const baseURL = "https://fiijoey.github.io/wdd230/";
const linksURL = "https://fiijoey.github.io/wdd230/data/links.json";

async function getLinks() {
    const response = await fetch(linksURL);
    const data = await response.json();
    console.log(data)
    displayLinks(data.weeks);
    
}

getLinks();

function displayLinks(weeks) {
    const linksList = document.getElementById('linksList');
    
    weeks.forEach(week => {
        const weekItem = document.createElement('li');
        
        let weekContent = `<strong>${week.week}: </strong>`;
        week.links.forEach((link, index) => {
            weekContent += `<a href="${link.url}">${link.title}</a>`;
            if (index < week.links.length - 1) {
                weekContent += '<strong> | </strong>';
            }
        });

        weekItem.innerHTML = weekContent;
        linksList.appendChild(weekItem);
    });
}