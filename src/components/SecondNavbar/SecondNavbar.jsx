import React from 'react';
import { Button, Stack } from '@mui/material';
import { BLACK_LOGO, PRODUCT_QUERY_STRING } from '../../utils/globalVariables';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const SecondNavbar = ({
  handleClick,
  handleCloseHover,
  direction,
  spacing,
}) => {
  const logo = BLACK_LOGO;
  const classes = useStyles();

  return (
    <Stack direction={direction} spacing={spacing}>
      <Button
        color="black"
        size="large"
        onClick={handleClick}
        onMouseOver={handleClick}
        onMouseLeave={handleCloseHover}
        className={classes.navButton}
      >
        Danh mục <ExpandMoreIcon />
      </Button>
      <Button
        component={Link}
        to={`/products?${PRODUCT_QUERY_STRING.page}=${1}`}
        className={classes.navButton}
        color="black"
        size="large"
      >
        Sản phẩm
      </Button>
      <Button className={classes.navButton} color="black" size="large">
        Về ADNCloth
      </Button>
    </Stack>
  );
};

export default SecondNavbar;
