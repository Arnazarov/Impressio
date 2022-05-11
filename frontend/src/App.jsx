import React from 'react';
import { Container } from '@material-ui/core';
import Header from './components/Header/Header';
import HomeScreen from './screens/Home/HomeScreen';
import { Routes, Route } from 'react-router-dom';
import AuthScreen from './screens/Auth/AuthScreen';
import { GoogleOAuthProvider } from '@react-oauth/google';
const App = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Container maxWidth="lg">
        <Header />
        <Routes>
          <Route path="/" element={<HomeScreen />} exact />
          <Route path="/login" element={<AuthScreen />} exact />
        </Routes>
      </Container>
    </GoogleOAuthProvider>
  );
};

export default App;
