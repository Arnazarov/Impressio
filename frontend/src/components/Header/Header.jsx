import React, { useState, useEffect } from 'react';
import useStyles from './headerStyles';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import logo from '../../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogoutAction } from '../../actions/userActions';
import decode from 'jwt-decode';

const Navbar = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userAuth = useSelector((state) => state.userAuth);
  const { authData } = userAuth;

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('userProfile'))
  );

  const logoutHandler = () => {
    dispatch(userLogoutAction());
    navigate('/');
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logoutHandler();
      }
    }
    setUser(JSON.parse(localStorage.getItem('userProfile')));
  }, [authData]);

  return (
    <AppBar className={styles.appBar} position="static" color="inherit">
      <div className={styles.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={styles.heading}
          variant="h4"
          align="center"
        >
          IMPRESSI
        </Typography>
        <img className={styles.image} src={logo} alt="icon" height="70" />
      </div>
      <Toolbar className={styles.toolbar}>
        {user ? (
          <div className={styles.profile}>
            <Avatar
              className={styles.purple}
              alt={user.name}
              src={user.picture}
            >
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
            <Typography className={styles.userName} variant="h6">
              {user.name}
            </Typography>
            <Button
              variant="contained"
              className={styles.logout}
              color="secondary"
              onClick={logoutHandler}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/login"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
