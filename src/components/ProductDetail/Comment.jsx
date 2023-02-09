import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  Typography,
} from '@mui/material';
import React from 'react';
import useStyles from './styles';

const Comment = ({ keyname, comment }) => {
  const classes = useStyles();
  return (
    <List key={keyname} className={classes.commentList}>
      <Divider />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Dante" src={comment?.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={comment?.userFullName}
          secondary={
            <React.Fragment>
              {comment?.create_at}
              <Typography
                letterSpacing="1px"
                fontSize="16px"
                fontWeight="normal"
                paddingTop="10px"
                component="span"
                color="text.primary"
                display="block"
              >
                {comment?.comContent}
              </Typography>
            </React.Fragment>
          }
        />
        <div style={{ marginTop: '6px' }}>
          <Rating
            readOnly
            value={comment?.comRating}
            precision={0.1}
            size="small"
          />
        </div>
      </ListItem>
    </List>
  );
};

export default Comment;
