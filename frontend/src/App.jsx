import React, { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import logo from './images/logo.png';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from './appStyles';
import { useDispatch } from 'react-redux';
import { postListAction } from './actions/postActions';

const App = () => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(postListAction());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className={styles.appBar} position="static" color="inherit">
        <Typography className={styles.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img className={styles.image} src={logo} alt="memories" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
