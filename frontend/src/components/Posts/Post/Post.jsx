import React, { useState } from 'react';
import useStyles from './postStyles';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  ButtonBase,
  Typography,
} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { postDeleteAction, postLikeAction } from '../../../actions/postActions';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const styles = useStyles();
  const [likes, setLikes] = useState(post?.likes);

  const userAuth = useSelector((state) => state.userAuth);
  const { authData } = userAuth;

  const userID = authData?.sub || authData?.id;
  const likedPost = post.likes.find((like) => like === userID);

  const deleteHandler = (id) => {
    dispatch(postDeleteAction(id));
  };

  const likeHandler = async () => {
    dispatch(postLikeAction(post._id));

    if (likedPost) {
      setLikes(post.likes.filter((id) => id !== userID));
    } else {
      setLikes([...post.likes, userID]);
    }
  };

  const pageDetailsHandler = () => {
    navigate(`/posts/${post._id}`);
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userID) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={styles.card} raised elevation={6}>
      <ButtonBase className={styles.cardAction} onClick={pageDetailsHandler}>
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
      </ButtonBase>
      <div className={styles.overlay2}>
        <Button
          dtyle={{ color: 'white' }}
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            setCurrentId(post._id);
          }}
        >
          <MoreHorizon fontSize="medium" />
        </Button>
      </div>
      <div className={styles.details}>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.tags.map((tag) => ` #${tag}`)}
        </Typography>
      </div>
      <Typography className={styles.title} gutterBottom variant="h5">
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
          onClick={likeHandler}
          disabled={!authData}
        >
          <Likes />
        </Button>
        {(authData?.sub === post.creatorId ||
          authData?.id === post.creatorId) && (
          <Button
            size="small"
            color="primary"
            onClick={() => deleteHandler(post._id)}
          >
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
