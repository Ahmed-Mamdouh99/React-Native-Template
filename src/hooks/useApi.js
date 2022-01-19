import {useState, useEffect} from 'react';

/**
 * This function takes a list of objects and a key and returns a copy of the list with no duplicate keys.
 * @param {*} list list of items to check
 * @param {*} key the key to compare for duplicates
 * @returns a copy of list with no duplicates
 */
const filterUniqueId = (list, key) => {
  return list.filter(
    (item1, index) =>
      list.findIndex(item2 => item1[key] === item2[key]) === index,
  );
};

/**
 * This hook takes care of the business logic of fetching, keeping and updating data from the api
 * @returns [movies, loadMore, currentPage, totalPages, loading]
 * movies: current list of movies
 * loadMore: a function to call to load more movies
 * reachedEnd: true if last page reached
 * loading: true if currently fetching new page
 */
const useApi = () => {
  // Set uri bases
  const posterUriBase = 'https://image.tmdb.org/t/p/w500';
  const movieApiBase =
    'http://api.themoviedb.org/3/discover/movie?api_key=API_KEY&page=';
  // Save current movies list
  const [movies, setMovies] = useState([]);
  // Save the current page to be loaded from the api
  const [currentPage, setCurrentPage] = useState(1);
  // Save the total pages available from the api
  const [totalPages, setTotalPages] = useState(1);
  // Save the current loading status
  const [loading, setLoading] = useState(false);

  /**
   * This function is called to increment the current page counter
   * to trigger a data fetch event
   * @returns void
   */
  const loadMore = () => {
    // Don't load if currently loading
    if (loading) {
      return;
    }
    // Don't load if last page reached
    if (currentPage >= totalPages) {
      return;
    }
    // Increment current page
    setCurrentPage(oldValue => Math.min(totalPages, oldValue + 1));
  };

  /**
   * This function handles the json response from the api by:
   * 1- Getting information and reformatting results
   * 2- Appending the movies list with the newly formatted results
   * 3- Refreshing the total pages count
   * @param {*} results list of movies returned by the api
   * @param {*} total_pages total number of pages available returned by the api
   */
  const handleResults = ({results, total_pages}) => {
    // Map results to get the poster path, overview, release date, title and id
    const newMovies = results.map(
      ({poster_path, overview, release_date, title, id}) => ({
        title,
        date: new Date(release_date),
        overview,
        posterUri: `${posterUriBase}${poster_path}`,
        id,
      }),
    );
    // Append new movies to the state and filter results to remove any duplicates
    setMovies(oldMovies => filterUniqueId(oldMovies.concat(newMovies), 'id'));
    // Refresh total pages available
    setTotalPages(total_pages);
    // Set loading to false
    setLoading(false);
  };

  /**
   * This function is called when fetch fails
   * @param {*} _error error object
   */
  const handleFetchError = _error => {
    setLoading(false);
  };

  /**
   * This function is called when unpacking the json response fails
   * @param {*} _error error object
   */
  const handleJsonError = _error => {
    setLoading(false);
  };

  // Set a hook to fetch new data when the current page is changed
  useEffect(() => {
    setLoading(true);
    fetch(`${movieApiBase}${currentPage}`)
      .then(res => res.json().then(handleResults).catch(handleJsonError))
      .catch(handleFetchError);
  }, [currentPage]);

  return [movies, loadMore, currentPage === totalPages, loading];
};

export default useApi;
