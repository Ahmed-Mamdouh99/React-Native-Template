import React, {useState} from 'react';
import {StyleSheet, Image, TouchableOpacity, View} from 'react-native';
import {Card, Text, Layout} from '@ui-kitten/components';
import usePosterPlaceholder from '../hooks/usePosterPlaceholder';

/**
 * This function renders the header for the movie card
 * @param {*} headerProps
 * @param {*} item contains the movie details
 * @returns
 */
const renderHeader = (headerProps, item) => (
  <Layout {...headerProps} style={styles.headerRowContainer}>
    <View style={styles.headerRowContainer}>
      <Text testID="titleText" category="h6" style={styles.headerText}>
        {item.title}
      </Text>
      <Text testID="dateText" category="h6">
        {item.date.toDateString()}
      </Text>
    </View>
  </Layout>
);

/**
 * This component renders a card to show the information of a movie
 * @param {*} item: movie data {title, overview, poster, date, }
 * @returns
 */
const Movie = ({item}) => {
  // Get placeholder poster object from custom hook
  const posterPlaceholder = usePosterPlaceholder();
  /**
   * Sets the initial poster state to poster uri if available
   * The falls back to poster object if available, then falls back to placeholder
   * @returns
   */
  const getInitialPosterState = () =>
    item.posterUri
      ? {uri: item.posterUri}
      : item.poster
      ? item.poster
      : posterPlaceholder;
  const [posterSource, setPosterSource] = useState(getInitialPosterState());
  const [showOverview, setShowOverview] = useState(false);

  /**
   * Toggles the showOverview flag
   */
  const toggleOverview = () => {
    setShowOverview(oldValue => !oldValue);
  };

  /**
   * This function should handle errors of loading the poster image
   * by setting the poster to the placeholder
   * @returns
   */
  const handlePosterOnError = () => {
    // If the error comes from using the placeholder, then do nothing
    if (posterSource === posterPlaceholder) {
      return;
    }
    setPosterSource(posterPlaceholder);
  };

  return (
    <Card
      style={styles.item}
      status="basic"
      header={headerProps => renderHeader(headerProps, item)}>
      <TouchableOpacity testID="overviewToggle" onPress={toggleOverview}>
        <View style={styles.posterContainer}>
          <Image
            testID="posterImage"
            style={styles.poster}
            source={posterSource}
            onError={handlePosterOnError}
          />
        </View>
        <View style={styles.textContainer}>
          <Text testID="overviewText">{showOverview ? item.overview : ''}</Text>
          <Text testID="showOverviewTipText">
            {showOverview ? 'Tap to hide overview' : 'Tap to show overview'}
          </Text>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  posterContainer: {
    flexDirection: 'row',
  },
  poster: {
    aspectRatio: 1,
    resizeMode: 'stretch',
    flex: 1,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'justify',
  },
  headerRowContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  headerText: {
    flex: 1,
  },
});

export default Movie;
