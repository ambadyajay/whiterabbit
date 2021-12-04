import React from 'react'
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';

// icon pack
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { ThemeContext } from './src/common/theme-context';

import { default as custom_theme } from './src/common/theme.json';


// navigator
import RootNavigator from './src/navigation/Router';

const App = () => {
  const [theme, setTheme] = React.useState('light',
  );
  return (
    <ThemeContext.Provider value={{ theme }}>
      <ApplicationProvider {...eva}
        theme={{ ...eva[theme], ...custom_theme }}>
        <IconRegistry icons={EvaIconsPack} />
        <RootNavigator />
      </ApplicationProvider>
    </ThemeContext.Provider>
  )
}

export default App
