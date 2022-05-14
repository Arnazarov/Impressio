import React from 'react';
import { Container } from '@material-ui/core';
import Header from './components/Header/Header';
import HomeScreen from './screens/Home/HomeScreen';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthScreen from './screens/Auth/AuthScreen';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PostDetails from './components/PostDetails/PostDetails';
const App = () => {
  const user = JSON.parse(localStorage.getItem('userProfile'));
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Container maxWidth="xl">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} exact />
          <Route path="/posts" element={<HomeScreen />} exact />
          <Route path="/posts/search" element={<HomeScreen />} exact />
          <Route path="/posts/:id" element={<PostDetails />} exact />
          <Route
            path="/login"
            element={!user ? <AuthScreen /> : <Navigate to="/posts" />}
            exact
          />
        </Routes>
      </Container>
    </GoogleOAuthProvider>
  );
};

export default App;
