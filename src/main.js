const btnSearch = document.getElementById('searchbyTitle');
const type = document.getElementById('selector');
const display = document.getElementById('posters');
const slideshow = document.getElementById('slideshow');
const card = document.getElementById('card');
let movieArray = [];
let url = '';

const searchTitles = () => {
    const titleName = document.getElementById('byTitle').value;
    const typeOf = type.options[type.selectedIndex].value;
    url = `http://www.omdbapi.com/?type=${typeOf}&s=${titleName}&r=json&apikey=3ab3fdc7`
    fetch(url)
        .then(res => res.json())
        .then(json => {
            json.Search.forEach(element => {
                let movieshort = {
                    poster: element.Poster,
                    title: element.Title,
                    type: element.Type,
                    year: element.Year,
                    id: element.imdbID,
                }
                movieArray.push(movieshort);
            });
        })
    return movieArray;
};

const showDisplay = (arrayToPrint) => {
    slideshow.classList.add('hide');
    display.classList.remove('hide');
    card.classList.add('hide');
    display.innerHTML = null;
    arrayToPrint.forEach(element => {
        display.innerHTML += `
          <figure class="wp-caption">
          <input class="wp-caption-image"  id="${element.id}" name="${element.title}" type="image" src="${element.poster}" alt="${element.title}">
          <figcaption class="wp-caption-text" type="text">${element.title}</figcaption>
          </figure>`;
    })
};

btnSearch.addEventListener('click', () => {
    searchTitles();
    showDisplay(movieArray);
    movieArray = [];
});

const getId = (event) => {
    const idMovie = event.target.id;
    showCard(idMovie);
};

const showCard = (idMovie) => {
    let movie = {};
    display.classList.add('hide');
    card.classList.remove('hide');
    movieArray.forEach(movie => {
        if (idMovie === movie.id) {
            url = `http://www.omdbapi.com/?i=${idMovie}&r=json&apikey=3ab3fdc7`
            fetch(url)
                .then(res => res.json())
                .then(json => {
                    movie = {
                        poster: json.Poster,
                        title: json.Title,
                        type: json.Type,
                        year: json.Year,
                        id: json.imdbID,
                        actors: json.Actors,
                        awards: json.Awards,
                        country: json.Country,
                        dvd: json.DVD,
                        director: json.Director,
                        genre: json.Genre,
                        language: json.Language,
                        plot: json.plot,
                        production: json.Production,
                        released: json.Released,
                        runtime: json.runtime,
                        writer: json.Writer,
                        rating: json.imdbRating,
                    }
                    card.innerHTML = `
                    <img class="cardImg" src="${movie.poster}" alt="${movie.title}" >
                    <aside class="characteristics">
                    <h2>${movie.title}</h2>
                    <aside class="moviecard">
                      <div>
                      <p> resumen: ${movie.plot}</p>
                      </div>
                      <div>
                      <p> año: ${movie.year}</p>
                      </div>
                      <div>
                      <p>tipo: ${movie.type}</p>
                      </div>
                      <div>
                      <p>estreno: ${movie.released}</p>
                      </div>
                      <div>
                      <p>idioma: ${movie.language}</p>
                      </div>
                      <div>
                      <p>genero: ${movie.genre}</p>
                      </div>
                    </aside>        
                    `;
                })
        }
    });
};

display.addEventListener('click', getId);

/* const searchMovies = async(searchBy,page) => {
    const url = baseURL +'&s='+ searchBy +'&page='+ page;
       const response = await fetch(url);
       const json = await response.json();
       return json.Search;
       }

const select = document.getElementById("select1");

const selectOption = () => {
    let word = select.value;
    switch(word) {
      case 'Acción':
        searchTitles('kill',1).then(data => showCard(data))
      break;
      case 'Guerra':
        searchTitles('war',1).then(data => showCard(data))
      break;
      case 'Humor':
        searchTitles('comedy',1).then(data => showCard(data));
      break;
    }
  }

  select.addEventListener('change', selectOption);

  window.searchMovies = searchMovies; */