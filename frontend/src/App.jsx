import React from 'react';
import { Container } from '@material-ui/core';
import Header from './components/Header/Header';
import HomeScreen from './screens/Home/HomeScreen';
import { Routes, Route } from 'react-router-dom';
import AuthScreen from './screens/Auth/AuthScreen';

const App = () => {
  return (
    <Container maxWidth="lg">
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} exact />
        <Route path="/login" element={<AuthScreen />} exact />
      </Routes>
    </Container>
  );
};

export default App;
