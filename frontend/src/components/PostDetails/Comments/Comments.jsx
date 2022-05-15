import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import useStyles from '../postDetailsStyles';
import { postCommentAction } from '../../../actions/postActions';

const Comments = ({ post }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const commentsRef = useRef();
  const [comments, setComments] = useState(post?.comments ? post.comments : []);
  const [comment, setComment] = useState('');

  const userProfile = JSON.parse(localStorage.getItem('userProfile'));

  const submitHandler = async () => {
    const commentToSubmit = `${userProfile.name}: ${comment}`;
    const updatedComments = await dispatch(
      postCommentAction(commentToSubmit, post._id)
    );
    setComments(updatedComments);
    setComment('');
    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <div className={styles.commentsOuterContainer}>
        <div className={styles.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments:
          </Typography>
          {comments?.map((comment, index) => (
            <Typography key={index} gutterBottom variant="subtitle1">
              <strong>{comment.split(': ')[0]}: </strong>
              <p style={{ fontStyle: 'italic', display: 'inline' }}>
                {comment.split(':')[1]}
              </p>
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {userProfile?.name && (
          <div style={{ minWidth: '50%' }}>
            <Typography gutterBottom variant="h6">
              Write a comment:
            </Typography>
            <TextField
              fullWidth
              minRows={4}
              variant="outlined"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <br />
            <Button
              style={{ marginTop: '10px' }}
              fullWidth
              disabled={!comment.length}
              color="primary"
              variant="contained"
              onClick={submitHandler}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
