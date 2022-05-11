import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import useStyles from './authStyles';
import AuthInput from '../../components/AuthInput/AuthInput';
import { useGoogleLogin, GoogleLogin } from '@react-oauth/google';

const AuthScreen = () => {
  const styles = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const submitHandler = () => {};
  const handleChange = () => {};
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const switchAuthScreenHandler = () => setIsSignup(!isSignup);

  // Google
  const login = useGoogleLogin({
    onSuccess: (res) => console.log(res),
  });

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={styles.paper} elevation={3}>
        <Avatar className={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {isSignup ? 'Impressio Sign Up' : 'Impressio Sign In'}
        </Typography>
        <form className={styles.form} onSubmit={submitHandler}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <AuthInput
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  viewHalf="viewHalf"
                  autoFocus
                />
                <AuthInput
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  viewHalf="viewHalf"
                />
              </>
            )}
            <AuthInput
              name="email"
              label="Email"
              handleChange={handleChange}
              type="email"
            />
            <AuthInput
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleClickShowPassword={handleClickShowPassword}
            />
            {isSignup && (
              <AuthInput
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

          <Button
            type="submit"
            size="medium"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.submit}
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <Grid container direction="column" alignItems="center" spacing={2}>
            <Avatar className={styles.avatars}>
              <LockOpenOutlinedIcon />
            </Avatar>

            <Typography variant="h5">Google Sign In</Typography>
            <Grid item>
              <GoogleLogin
                onSuccess={(response) => {
                  console.log(response);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </Grid>
          </Grid>

          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Button
                className="textTransformNone textDecoration"
                variant="text"
                onClick={switchAuthScreenHandler}
              >
                {isSignup
                  ? 'Have an account? Sign in'
                  : 'No account? Register here'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AuthScreen;
