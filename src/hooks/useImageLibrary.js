import {useState} from 'react';
import {NativeModules} from 'react-native';

/**
 * This hook takes care of picking an image from the phone's library
 * @returns
 */
const useImageLibrary = () => {
  const [image, setImage] = useState(null);

  // Set options for the launch image library function
  const options = {
    mediaType: 'photo', // Only select photos
    quality: 1, // Keep quality
    maxWidth: 0, // No max width
    maxHeight: 0, // No max height
    includeBase64: false, // Do not include base 64 encoding
    selectionLimit: 1, // Only select 1 image
    noData: true, // No error when canceling without selecting data
  };

  /**
   * Handle picked image by setting the uri to the result if available
   * @param {*} response response from the launchImageLibrary call
   */
  const handlePickedPhoto = response => {
    if (response?.assets?.length > 0) {
      setImage(response.assets[0].uri || null);
    }
  };

  /**
   * launch phone image library to select an image
   * @returns
   */
  const launchImageLibrary = () =>
    NativeModules?.ImagePickerManager?.launchImageLibrary(
      options,
      handlePickedPhoto,
    );

  return [image, launchImageLibrary];
};

export default useImageLibrary;
