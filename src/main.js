const btnSearch = document.getElementById('searchbyTitle');
const type = document.getElementById('selector');
const display = document.getElementById('posters');
let movie = [];

const showDisplay = (arrayToPrint) => {
    arrayToPrint.forEach(element => {
        display.innerHTML += `
          <figure class="wp-caption">
          <img class="poster" name="${element.title}" type="image" src="${element.poster}" alt="${element.title}"/>
          <p>${element.title}</p>
          <p>${element.year}</p>
          <p>${element.genre}</p>              
          </figure>`;
    })
};

const searchTitles = () => {
    const titleName = document.getElementById('byTitle').value;
    const typeOf = type.options[type.selectedIndex].value;
    let url = `http://www.omdbapi.com/?s=${titleName}&type=${typeOf}&y=${year}&r=json&apikey=3ab3fdc7`
    fetch(url)
        .then(res => res.json())
        .then(json => {
            json.Search.forEach(element => {
                movie = [{
                    poster: element.Poster,
                    title: element.Title,
                    type: element.Type,
                    year: element.Year,
                    genre: element.Genre,
                }]
                showDisplay(movie);
            });

        })


    display.innerHTML = null;
    return movie;
};




btnSearch.addEventListener('click', searchTitles);