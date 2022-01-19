import React from 'react';
// Imports for kitten ui application provider (theme package)
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';

const UiWrapper = ({children}) => (
  <ApplicationProvider {...eva} theme={eva.light}>
    {children}
  </ApplicationProvider>
);

export default UiWrapper;
