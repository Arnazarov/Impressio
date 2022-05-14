import React from 'react';
import Post from './Post/Post';
import useStyles from './postsStyles';
import { useSelector } from 'react-redux';
import { CircularProgress, Grid } from '@material-ui/core';

const Posts = ({ setCurrentId }) => {
  const styles = useStyles();
  const postList = useSelector((state) => state.postList);
  const { posts, isLoading } = postList;

  return !posts.length && !isLoading ? (
    'No posts!'
  ) : isLoading ? (
    <CircularProgress size={100} />
  ) : (
    <Grid
      className={styles.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post setCurrentId={setCurrentId} post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
