import React, { useEffect, useState } from 'react';
import useStyles from './formStyles';
import FileBase64 from 'react-file-base64';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { postCreateAction, postUpdateAction } from '../../actions/postActions';

const Form = ({ currentId, setCurrentId }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });

  const currentPost = useSelector(
    (state) => currentId && state.posts.find((post) => post._id === currentId)
  );

  useEffect(() => {
    if (currentPost) {
      setPostData(currentPost);
    }
  }, [currentPost]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(postUpdateAction(currentId, postData));
    } else {
      dispatch(postCreateAction(postData));
    }
    clearHandler();
  };
  const clearHandler = () => {
    setCurrentId(null);
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    });
  };
  return (
    <Paper className={styles.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${styles.root} ${styles.form} `}
        onSubmit={submitHandler}
      >
        <Typography variant="h6">
          {currentId ? 'Edit' : 'Create'} an Impressio
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        ></TextField>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        ></TextField>
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        ></TextField>
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        ></TextField>
        <div className={styles.fileInput}>
          <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          ></FileBase64>
        </div>
        <Button
          className={styles.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          type="submit"
          fullWidth
          onClick={clearHandler}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
