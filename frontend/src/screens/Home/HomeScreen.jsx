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
import { postListAction, postSearchAction } from '../../actions/postActions';
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
  const searchQuery = query.get('search');

  const styles = useStyles();

  // Local state
  const [searchTitle, setSearchTitle] = useState('');
  const [searchTags, setSearchTags] = useState([]);
  const [currentId, setCurrentId] = useState(0);

  const searchPost = () => {
    if (searchTitle.trim() || searchTags) {
      dispatch(
        postSearchAction({
          title: searchTitle,
          tags: searchTags.join(','),
        })
      );
      navigate(`/posts/search?title=${searchTitle}&tags=${searchTags}`);
    } else {
      navigate('/');
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl" className={styles.mainContainer}>
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
                label={
                  <label>
                    <i className="fa-solid fa-magnifying-glass" /> titles
                  </label>
                }
                fullWidth
                value={searchTitle}
                onChange={(e) => {
                  setSearchTitle(e.target.value);
                }}
                // onKeyPress={(e) => {e.keyCode === 13 && }}
              />
              <ChipInput
                style={{ margin: '10px 0' }}
                label={
                  <label>
                    <i className="fa-solid fa-magnifying-glass" /> tags
                  </label>
                }
                value={searchTags}
                variant="outlined"
                onAdd={(tag) => setSearchTags([...searchTags, tag])}
                onDelete={(tag) =>
                  setSearchTags(searchTags.filter((t) => t !== tag))
                }
              />
              <Button color="primary" variant="contained" onClick={searchPost}>
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper className={styles.pagination} elevation={6}>
              <CustomPagination page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default HomeScreen;
