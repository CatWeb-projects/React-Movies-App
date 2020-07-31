const searchMovie = async () => {
  const key = 'ad2fb2e9ab12851bd813fca1a20c373e';
  const searchMovie = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`);
  return searchMovie.data.results
}

$(document).ready(async() => {
  const foundMovies = await searchMovie()
  const selectContainer = $(".search-content")
  const urlParams = new URLSearchParams(window.location.search);
  const getTitle = urlParams.get('title')
  await foundMovies.map((item) => {
    item.title.toLowerCase().match(getTitle.toLowerCase()) ?
    selectContainer.append(`
    <div class="search-content__item">
     <div class="search-content__image">
       <a href="movie.html?id=${item.id}">
         <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="">
       </a>
     </div>
     <div class="search-content__text">
       <span>${item.title}</span>
       <span>${item.overview}</span><br>
       <span>Released: ${item.release_date}</span>
       <span>Rating: ${item.vote_average} <i class="stars">★★★★★</i></span>
       <span>Popularity: ${item.popularity} <i class="fas fa-eye stars"></i></span>
       <span>Popularity: ${item.vote_count} <i class="fas fa-heart"></i></span>
     </div>
    </div>
    `)
     : false
  })
});

const setSearchQuery = (event) => {
  event.preventDefault();
  let searchValue = $("#click-search").val()
  console.log(searchValue);
  window.location.replace(`search.html?title=${searchValue}`);
};