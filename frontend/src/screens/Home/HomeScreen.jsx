import React, { useEffect, useState } from 'react';
import { Container, Grow, Grid, Paper } from '@material-ui/core';
import Posts from '../../components/Posts/Posts';
import Form from '../../components/Form/Form';
import useStyles from './homeStyles';
import { useDispatch } from 'react-redux';
import { postListAction } from '../../actions/postActions';
import CustomPagination from '../../components/Pagination/CustomPagination';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(postListAction());
  }, [dispatch, currentId]);
  return (
    <Grow in>
      <Container>
        <Grid
          className={styles.mainContainer}
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
            <Paper className={styles.pagination} elevation={6}>
              <CustomPagination />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default HomeScreen;
