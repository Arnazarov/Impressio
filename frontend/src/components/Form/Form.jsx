import React, { useState } from 'react';
import useStyles from './formStyles';
import FileBase from 'react-file-base64';
import { TextField, Button, Typography, Paper } from '@material-ui/core';

const Form = () => {
  const styles = useStyles();
  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    messsage: '',
    tags: '',
    selectedFile: '',
  });

  const submitHandler = () => {};
  const clearHandler = () => {};
  return (
    <Paper className={styles.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${styles.root} ${styles.form} `}
        onSubmit={submitHandler}
      >
        <Typography variant="h6">Create an Impressio</Typography>
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
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          ></FileBase>
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
