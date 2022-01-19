/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout} from '@ui-kitten/components';
import MoviesScreen from './screens/MoviesScreen';

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <SafeAreaView style={styles.container}>
        <Layout style={styles.layout} level="1">
          <MoviesScreen />
        </Layout>
      </SafeAreaView>
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
});

export default App;
