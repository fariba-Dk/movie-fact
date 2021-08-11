// Catch a submission of this form then call on a function getMovies that will reach out to the movie site API

$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});
//http://www.omdbapi.com/?i=tt3896198&apikey=730744a8
function getMovies(searchText) {
  axios
    .get('http://www.omdbapi.com/?s=' + searchText + '&apikey=730744a8') //key provided to me
    .then((response) => {
      let movies = response.data.Search;
      console.log(movies);
      let output = ''; //loop thru movies arr then append each movie into this variable and show on screen
      $.each(movies, (index, movie) => {
        output += `<div class="col-md-3">
               <div class="well text-center">
                <img src="${movie.Poster}">
                <h5>${movie.Title}</h5>
                <a onclick="movieSelected('${movie.imdbID}')" class="btn
                btn-primary" href="#">Movie Details</a>
              </div>
            </div>`;
      });
      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

//       (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// 0: {Title: "American Dad!", Year: "2005–", imdbID: "tt0397306", Type: "series", Poster: "https://m.media-amazon.com/images/M/MV5BNDRkOWIyOT…2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"}
// 1: {Title: "World's Greatest Dad", Year: "2009", imdbID: "tt1262981", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BNDZhMThjMD…jNhZGVmXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"}
// (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// 0: {Title: "American Dad!", Year: "2005–", imdbID: "tt0397306", Type: "series", Poster: "https://m.media-amazon.com/images/M/MV5BNDRkOWIyOT…2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"}
// 1:
// Poster: "https://m.media-amazon.com/images/M/MV5BNDZhMThjMDMtYTY4Mi00YmVjLTgxZDYtZDQzZjdmNjNhZGVmXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
// Title: "World's Greatest Dad"
// Type: "movie"
// Year: "2009"
// imdbID: "tt1262981"
// __proto__: Object

//an array of movies when used search text

// ~~~~~~~  now selected Movie ~~~~

function movieSelected(id) {
  sessionStorage.setItem('movieId', id); //passing data from 1 page to another using SESSION STORAGE
  window.location = 'movie.html'; //we want to change the page and go to movie.html page
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem('movieId');

  axios
    .get('http://www.omdbapi.com/?i=' + movieId + '&apikey=730744a8')
    .then((response) => {
      console.log(response);
      let movie = response.data;
      let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
              <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
            </ul>
          </div>
        </div>        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://omdb.com/title/${movie.omdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-default">Go Back To Search</a>
          </div>
        </div>
      `;

      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
