import React, {useState} from 'react';
import {Button, Datepicker, Input} from '@ui-kitten/components';
import {Platform, Image, StyleSheet, KeyboardAvoidingView} from 'react-native';
import usePosterPlaceholder from '../hooks/usePosterPlaceholder';
import useImageLibrary from '../hooks/useImageLibrary';

/**
 * This component handles the user input form for user added movies
 * @param {*} param0 addMovie: Function called when the user adds a movie
 * @returns
 */
const AddMovie = ({addMovie}) => {
  // Get the theme placeholder
  const posterPlaceholder = usePosterPlaceholder();
  // Keep track of the title input
  const [title, setTitle] = useState('');
  // Get the custom image uri and library launcher
  const [posterUri, launchImageLibrary] = useImageLibrary();
  // Keep track of the overview input
  const [overview, setOverview] = useState('');
  // Keep track of the date input
  const [date, setDate] = useState(new Date());
  /**
   * Handle form submission
   */
  const handleAddMovie = () => {
    addMovie({title, posterUri, overview, date});
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Input
        testID="titleInput"
        status="primary"
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <Image
        source={posterUri ? {uri: posterUri} : posterPlaceholder}
        style={styles.poster}
      />
      <Button onPress={launchImageLibrary}>
        {posterUri ? 'Change poster' : 'Choose Poster'}
      </Button>
      <Input
        testID="overviewInput"
        status="primary"
        multiline={true}
        placeholder="Movie overview"
        value={overview}
        onChangeText={setOverview}
      />
      <Datepicker testID="dateInput" date={date} onSelect={setDate} />
      <Button testID="submitButton" onPress={handleAddMovie}>
        Add Movie
      </Button>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  poster: {
    aspectRatio: 1.5,
    resizeMode: 'contain',
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

export default AddMovie;
