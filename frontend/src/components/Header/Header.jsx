import React from 'react';
import useStyles from './headerStyles';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const styles = useStyles();
  const user = null;

  return (
    <AppBar className={styles.appBar} position="static" color="inherit">
      <div className={styles.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={styles.heading}
          variant="h2"
          align="center"
        >
          Impressio
        </Typography>
        <img className={styles.image} src={logo} alt="icon" height="60" />
      </div>
      <Toolbar className={styles.toolbar}>
        {user ? (
          <div className={styles.profile}>
            <Avatar
              className={styles.purple}
              alt={user.name}
              src={user.imageUrl}
            >
              {user.name.charAt(0)}
            </Avatar>
            <Typography className={styles.userName} variant="h6">
              {user.name}
            </Typography>
            <Button
              variant="contained"
              className={styles.logout}
              color="secondary"
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
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
