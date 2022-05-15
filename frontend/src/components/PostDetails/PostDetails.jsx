import React, { useEffect } from 'react';
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from '@material-ui/core';
import moment from 'moment';
import useStyles from './postDetailsStyles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  postFetchAction,
  postListAction,
  postSearchAction,
} from '../../actions/postActions';
import Comments from './Comments/Comments';

const PostDetails = () => {
  const postList = useSelector((state) => state.postList);
  const { post, posts, isLoading } = postList;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const styles = useStyles();
  let recommendedPosts = '';

  useEffect(() => {
    if (id) {
      dispatch(postFetchAction(id));
    }
  }, [id]);

  // useEffect(() => {
  //   if (post) dispatch(postListAction);
  // }, [post]);
  if (posts && post) {
    recommendedPosts = posts.filter((p) => p._id !== post._id).slice(0, 2);
  }

  const openPostHandler = (id) => {
    navigate(`/posts/${id}`);
  };
  return !post ? (
    ''
  ) : isLoading ? (
    <Paper elevation={6} className={styles.loadingPaper}>
      <CircularProgress size="7em" />
    </Paper>
  ) : (
    <Paper className={styles.mainPaper} elevation={6}>
      <div className={styles.card}>
        <div className={styles.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="p"
            className={styles.message}
          >
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.creator}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Comments post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={styles.imageSection}>
          <img
            className={styles.media}
            src={
              post.selectedFile ||
              'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
            }
            alt={post.title}
          />
        </div>
      </div>
      {recommendedPosts.length && (
        <div className={styles.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div className={styles.recommendedPosts}>
            {recommendedPosts.map(
              ({ title, creator, message, likes, selectedFile, _id }) => (
                <div
                  style={{ margin: '20px', cursor: 'pointer' }}
                  onClick={() => openPostHandler(_id)}
                  key={_id}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {creator}
                  </Typography>
                  <img
                    className={styles.media2}
                    src={selectedFile}
                    alt={title}
                  />
                  <Typography gutterBottom variant="subtitle1">
                    Likes: {likes.length}
                  </Typography>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
