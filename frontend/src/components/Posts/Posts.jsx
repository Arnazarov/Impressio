import React from 'react';
import Post from './Post/Post';
import useStyles from './postsStyles';

const Posts = () => {
  const styles = useStyles();
  return (
    <>
      <h1>Posts</h1>
      <Post></Post>
    </>
  );
};

export default Posts;
