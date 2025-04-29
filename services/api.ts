export const TMDB_CONFIG={
    BASE_URL:'https://api.themoviedb.org/3/',
    API_KEY:process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
         accept: 'application/json',
        //Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
          }
}
export const fetchMovies = async({query}:{query:string}) => {
    console.log('fetchMovies function called with query:', query);
    
    const endpoint = query
      ? `http://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${TMDB_CONFIG.API_KEY}`
      : `http://api.themoviedb.org/3/movie/popular?api_key=${TMDB_CONFIG.API_KEY}`;
    
    console.log('Using endpoint:', endpoint);
    
    try {
      console.log('Starting fetch request...');
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers
      });
      
      console.log('Response received, status:', response.status);
      
      if(!response.ok) {
        console.error('Error response:', response.status, response.statusText);
        throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Data parsed successfully, results count:', data.results?.length || 0);
      return data.results;
    } catch (error) {
      console.error('Fetch error in fetchMovies:', error);
      throw error;
    }
  }