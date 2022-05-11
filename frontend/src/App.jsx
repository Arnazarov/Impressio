import React from 'react';
import { Container } from '@material-ui/core';

import Header from './components/Header/Header';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <Container maxWidth="lg">
      <Header />
      <HomeScreen />
    </Container>
  );
};

export default App;
