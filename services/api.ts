export const TMDB_CONFIG={
    BASE_URL:'https://api.themoviedb.org/3/',
    API_KEY:process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
         accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
          }
}
export const fetchMovies= async({query}:{query:string})=>{
console.log('query',query)
    const endpoint= query
    ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${TMDB_CONFIG.API_KEY}`
    :`http://api.themoviedb.org/3/movie/popular?api_key=${TMDB_CONFIG.API_KEY}`;
  
    const response =await fetch(endpoint,{
        method:'GET',
        headers:TMDB_CONFIG.headers
    });
    if(!response.ok) {
        // @ts-ignore
        throw new Error ('Failed to fetch movies',response.statusText);
    }
    const data =await response.json();
    return data.results;

}
