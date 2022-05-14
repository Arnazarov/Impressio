import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from '@material-ui/core';
import Posts from '../../components/Posts/Posts';
import Form from '../../components/Form/Form';
import useStyles from './homeStyles';
import { useDispatch } from 'react-redux';
import { postListAction } from '../../actions/postActions';
import CustomPagination from '../../components/Pagination/CustomPagination';
import ChipInput from 'material-ui-chip-input';

// Query params hook
function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get('page') || 1;
  const search = query.get('search');

  const styles = useStyles();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(postListAction());
  }, [dispatch, currentId]);

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={styles.gridContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={styles.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search"
                fullWidth
                value=""
                onChange={() => {}}
              />
            </AppBar>
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
