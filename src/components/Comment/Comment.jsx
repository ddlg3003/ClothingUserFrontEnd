import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Rating, Typography } from '@mui/material';
import React from 'react';
import useStyles from './styles'; 

const Comment = () => {
    const classes = useStyles();

    return (
        <List className={classes.commentList}>
            <Divider />
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar
                        alt="Dante"
                        src={``}
                    />
                </ListItemAvatar>
                <ListItemText
                    primary="Dang"
                    secondary={
                        <React.Fragment>
                            {'28-10-2022'}
                            <Typography
                                letterSpacing="1px"
                                fontSize="16px"
                                fontWeight="normal"
                                paddingTop="10px"
                                component="span"
                                color="text.primary"
                                display="block"
                            >
                                Chất lượng tốt
                            </Typography>
                        </React.Fragment>
                    }
                />
                <div style={{ marginTop: '6px' }}>
                    <Rating readOnly value={4.5} precision={0.1} size="small" />
                </div>
            </ListItem>
        </List>
    );
};

export default Comment;
