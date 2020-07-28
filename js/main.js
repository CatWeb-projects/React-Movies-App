const getMovies = async () => {
  const key = 'https://api.themoviedb.org/3/discover/movie?api_key=ad2fb2e9ab12851bd813fca1a20c373e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';
  const data = await axios.get(key);
  return data.data.results.splice(0, 12);
}
$(document).ready(async() => {
  const movies = await getMovies()
  console.log(movies)
  await movies.map((item) => {
    $('.movies-container__movies').append(`
    <div class="movies-container__movie">
      <a href="/movie.html">
        <img class="content-main__nav__logo-small" src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="" />
      </a>
    </div>
    `)
  })
  
});