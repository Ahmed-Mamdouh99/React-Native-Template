import React from 'react';
import {SectionList, StyleSheet} from 'react-native';
import {Spinner, Text} from '@ui-kitten/components';
import useApi from '../hooks/useApi';
import Movie from '../components/Movie';
import AddMovieModal from '../components/AddMovieModal';
import useUserMovies from '../hooks/useUserMovies';

/**
 * This component renders the title of the sections in the section list
 * @param {*} param0 section: title The title of the section
 * @returns
 */
const SectionHeader = ({section: {title}}) => (
  <Text category="h4" style={styles.headerText}>
    {title}
  </Text>
);

/**
 * This component shows user movies and movies from the api.
 * It also allows the user to add user movies
 * @param {*} _props props passed from the Application
 * @returns void
 */
const MoviesScreen = _props => {
  const [allMovies, loadMoreMovies, endReached, loading] = useApi();
  const [userMovies, addMovie] = useUserMovies();

  // Create data array for section list
  const data = [
    {
      title: 'Your Movies',
      data: userMovies,
    },
    {
      title: 'All Movies',
      data: allMovies,
    },
  ];

  /**
   * This function is called to load more movies when
   * the section list reached its end
   * @returns void
   */
  const handleReachedEnd = () => {
    // Return if last page reached
    if (endReached) {
      return;
    }
    // Otherwise load more movies
    loadMoreMovies();
  };

  return (
    <>
      <AddMovieModal addMovie={addMovie} />
      <SectionList
        sections={data}
        keyExtractor={({id}) => id}
        renderItem={Movie}
        renderSectionHeader={SectionHeader}
        style={styles.list}
        onEndReached={handleReachedEnd}
        stickySectionHeadersEnabled={false}
      />
      {loading && <Spinner />}
    </>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    alignContent: 'flex-start',
    width: '100%',
  },
  list: {
    flex: 1,
    width: '100%',
  },
  headerText: {
    marginVertical: 4,
  },
});

export default MoviesScreen;
