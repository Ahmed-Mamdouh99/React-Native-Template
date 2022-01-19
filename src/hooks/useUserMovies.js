import {useState} from 'react';

const useUserMovies = () => {
  const [movies, setMovies] = useState([]);

  const testProperty = (object, property, type) =>
    typeof object[property] === type;

  const addMovie = movie => {
    // List all properties needed for the movie and their types
    const properties = [];
    properties.push(['title', 'string']);
    properties.push(['overview', 'string']);
    properties.push(['posterUri', 'string']);
    // Check if any of the properties is missing
    const missingProperties = properties.filter(
      ([property, type]) => !testProperty(movie, property, type),
    );
    if (missingProperties.length > 0) {
      return;
    }
    setMovies(oldMovies =>
      oldMovies.concat({...movie, id: movie.title.toLowerCase()}),
    );
  };

  return [movies, addMovie];
};

export default useUserMovies;
