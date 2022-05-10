import React from 'react';
import useStyles from './postStyles';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { postDeleteAction, postLikeAction } from '../../../actions/postActions';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const styles = useStyles();

  const deleteHandler = (id) => {
    dispatch(postDeleteAction(id));
  };

  const likeHandler = (id) => {
    dispatch(postLikeAction(id));
  };
  return (
    <Card className={styles.card}>
      <CardMedia
        className={styles.media}
        image={post.selectedFile}
        title={post.title}
        component="div"
      ></CardMedia>
      <div className={styles.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={styles.overlay2}>
        <Button
          dtyle={{ color: 'white' }}
          size="small"
          onClick={() => setCurrentId(post._id)}
        >
          <MoreHorizon fontSize="medium" />
        </Button>
      </div>
      <div className={styles.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {post.tags.map((tag) => `# ${tag}`)}
        </Typography>
      </div>
      <Typography
        className={styles.title}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={styles.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => likeHandler(post._id)}
        >
          <ThumbUpAltIcon fontSize="small" /> Like {post.likeCount}{' '}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => deleteHandler(post._id)}
        >
          <DeleteIcon fontSize="small" /> Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
