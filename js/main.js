const getMovies = async () => {
  const key = 'ad2fb2e9ab12851bd813fca1a20c373e';
  const data = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
  .then(res => res.json())
  return data.results
}
$(document).ready(async() => {
  const movies = await getMovies()
  const moviesContainer = $('.movies-container__movies')
  movies.map((item, key) => {
    key < 18 && moviesContainer.append(`
    <div class="movies-container__movie">
      <a href="movie.html?id=${item.id}">
        <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="" />
      </a>
    </div>
    `)
  })
  $('.spinner').hide()
});

const setSearchQuery = (event) => {
  event.preventDefault();
  let searchValue = $("#click-search").val()
  window.location.replace(`search.html?query=${searchValue}`);
};
