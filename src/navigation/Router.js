import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AppNavigator} from './NavigationTree';

const RootNavigator = props => {

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};


export default RootNavigator;