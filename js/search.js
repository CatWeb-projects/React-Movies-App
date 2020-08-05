const setSearchQuery = (event) => {
  event.preventDefault();
  const searchValue = $("#click-search").val()
  window.location.replace(`search.html?query=${searchValue}`);
};

const getSearchedMovies = async() => {
  const key = 'ad2fb2e9ab12851bd813fca1a20c373e';
  const urlParams = new URLSearchParams(window.location.search);
  const getTitle = urlParams.get('query')
  const searchMovie = await fetch(`https://api.themoviedb.org/3/search/movie?query=${getTitle}&api_key=${key}&language=en-US&page=1&include_adult=false&page=1`)
  .then(res => res.json())
  return searchMovie.results
}

$(document).ready(async() => {
  const movieItem = await getSearchedMovies()
  const selectContainer = $(".search-content")
  if (movieItem.length > 0) {
    return movieItem.map((item) => {
      selectContainer.append(`
      <div class="search-content__item">
      <div class="search-content__image">
        <a href="movie.html?id=${item.id}">
          <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" onerror="this.onerror=null; this.src='images/placeholder.png'" alt="Image">
        </a>
      </div>
      <div class="search-content__text">
        <span>${item.title}</span>
        <span>${item.overview}</span><br>
        <span>Released: ${item.release_date.substring(0, 4)}</span>
        <span>Rating: ${item.vote_average} <i class="stars">★★★★★</i></span>
        <span>Popularity: ${item.popularity} <i class="fas fa-eye stars"></i></span>
        <span>Popularity: ${item.vote_count} <i class="fas fa-heart"></i></span>
      </div>
      </div>
      `)
      $('.spinner').hide()
    })
  } else {
    $('.search-content').append(`
    <div class="not-found">
      <h3>No results found.There were no matches for your search term.</h3>
    </div>
  `)
    $('.spinner').hide()
  }
})