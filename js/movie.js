const getItemMovie = async () => {
  const key = 'ad2fb2e9ab12851bd813fca1a20c373e';
  const urlParams = new URLSearchParams(window.location.search);
  const getId = urlParams.get('id')
  const itemMovie = await axios.get(`https://api.themoviedb.org/3/movie/${getId}?api_key=${key}&language=en-US`);
  return itemMovie.data
}
$(document).ready(async() => {
  const movieItem = await getItemMovie()
  console.log(movieItem)
  $(".movie-container__image").replaceWith(`
    <div class="movie-container__image">
      <img src="https://image.tmdb.org/t/p/w500${movieItem.poster_path}" alt="">
      <a href="#"><span>
        <i class="fas fa-eye"></i>${movieItem.popularity}</span>
      </a>
      <a href="#">
        <span><i class="fas fa-heart"></i>${movieItem.vote_count}</span>
      </a>
    </div>
  `);
  $(".movie-container__info").replaceWith(`
  <div class="movie-container__info">
    <span>${movieItem.title}</span>
    <span>${movieItem.release_date}</span>
    <span>Directed by <a href="#">${movieItem.production_companies[0].name}</a></span>
  </div>
  `);
  $(".movie-container__text").replaceWith(`
  <div class="movie-container__text">
    <span>${movieItem.overview}</span>
  </div>
  `);
  $(".movie-container__duration").replaceWith(`
  <div class="movie-container__duration">
  <span>Runtime: ${movieItem.runtime} mins</span>
  </div>
  `);
  $(".rating-container__info").replaceWith(`
  <div class="rating-container__info">
    <a href="#"><span>Ratings</span></a>
    <a href="#"><span>${movieItem.vote_count} fans</span></a>
  </div>
  `);
  $(".rating-container-number").replaceWith(`
  <div class="rating-container-number">
    <a href="#">
      <span>${movieItem.vote_average}</span><span class="stars">★★★★★</span>
    </a>
  </div>
  `);
});

const setSearchQuery = (event) => {
  event.preventDefault();
  console.log(event);
  window.location.replace("/search.html");
};