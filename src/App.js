
// import { useState, useEffect } from "react";

// import MovieCard from "./MovieCard";
// import './App.css';
// import SearchIcon from './search.svg';

// const API_URL = 'http://www.omdbapi.com?apikey=ffc2a631';
// const App = () => {
//     const [movies, setMovies] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');

//     const searchMovies = async (title) => {
//         const response = await fetch(`${API_URL}&s=${title}`);
//         const data = await response.json();
//         setMovies(data.Search);
//     }
//     useEffect(() => {
//         searchMovies('Sherlock')
//     }, [])
//     return(
//         <div className="app">
//             <h1>MovieLand</h1>
//             <div className="search">
//                 <input
//                 placeholder="Search for movies"
//                 value= {searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <img
//                 src = {SearchIcon}
//                 alt = "search"
//                 onClick={() => searchMovies(searchTerm)}
//                 />
//             </div>
//             {
//                 movies?.length > 0
//                 ? (
//                 <div className="container">
//                    {movies.map((movie) => (
//                     <MovieCard movie = {movie}/>
//                    ))}
//                 </div>
//                 ):(
//                     <div className="empty">
//                         <h2>No movies found</h2>
//                     </div>
//                 )
//             }
//         </div>
//     );
// }

// export default App;
import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com?apikey=ffc2a631';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchMovies = async (title) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchMovies('Sherlock');
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
