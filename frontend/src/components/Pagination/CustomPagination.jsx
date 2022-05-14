import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import useStyles from './paginationStyles';
import { postListAction } from '../../actions/postActions';

const CustomPagination = ({ page }) => {
  const styles = useStyles();
  const postList = useSelector((state) => state.postList);
  const { pages } = postList;

  const dispatch = useDispatch();

  useEffect(() => {
    if (page) {
      dispatch(postListAction(page));
    }
  }, [dispatch, page]);

  return (
    <Pagination
      classes={{ ul: styles.ul }}
      count={pages}
      page={Number(page) || 1}
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
};

export default CustomPagination;
