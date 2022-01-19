import React, {useState} from 'react';
import {Layout, Modal, Button} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import AddMovie from './AddMovie';

/**
 * This component shows a modal with a form for adding user movies
 * @param {*} param0 addMovie: to be called when a movie is being added
 * @returns
 */
const AddMovieModal = ({addMovie}) => {
  // use visible to flag if the modal should be visible
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  /**
   * This function wraps the addMovie function to be called when
   * the form is submitted. It calls the given handler and hides the modal
   * @param {*} movie the data of the movie to be added
   */
  const handleAddMovie = movie => {
    addMovie(movie);
    hideModal();
  };

  return (
    <>
      <Button testID="showButton" onPress={showModal}>
        Add Movie
      </Button>
      <Modal visible={visible} backdropStyle={styles.backdrop}>
        <Layout testID="modalLayout" style={styles.backdropContainer}>
          <AddMovie addMovie={handleAddMovie} />
          <Button testID="hideButton" onPress={hideModal}>
            Cancel
          </Button>
        </Layout>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdropContainer: {
    flex: 1,
    width: '100%',
  },
});

export default AddMovieModal;
