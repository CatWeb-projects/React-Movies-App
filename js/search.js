const searchMovie = async () => {
  const key = 'ad2fb2e9ab12851bd813fca1a20c373e';
  const urlParams = new URLSearchParams(window.location.search);
  const getTitle = urlParams.get('title')
  const searchMovie = await axios.get(`https://api.themoviedb.org/3/movie/${getTitle}?api_key=${key}&language=en-US`)
  return searchMovie.data.title
}

const listMovies = async (searchedMovies) => {
  const movies = searchedMovies.results.reduce((result, movie, key) => {
    if(key === 1) 
    return `hello`
  })
}