import DeleteIcon from '@mui/icons-material/Delete';

import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
  CircularProgress,
} from '@mui/material';
import {
  useGetUserWishlistQuery,
  useToggleWishlistMutation,
} from '../../services/wishlistApis';
import { URL_REGEX } from '../../utils/globalVariables';
import { Link } from 'react-router-dom';

import React from 'react';

const Favorites = (props) => {
  const { data, isFetching } = useGetUserWishlistQuery();

  const [toggleWishlist] = useToggleWishlistMutation();

  const handleDeleteFav = async (productId) => {
    await toggleWishlist(productId);
  };

  return (
    <>
      <Box sx={{ display: 'flex', mb: 1 }}>
        <Box sx={{ flexGrow: 1 }} className={props.classes.title}>
          Sản phẩm yêu thích
        </Box>
      </Box>

      <Divider />
      {isFetching ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress color="black" size="4rem" />
        </Box>
      ) : (
        <Container
          sx={{
            mt: 3,
            height: '460px',
            overflow: data?.length > 2 ? 'scroll' : 'none',
          }}
        >
          {data?.map((favorite, i) => (
            <div key={i}>
              <Box>
                <Grid container spacing={2} sx={{ mb: 3, mt: 4 }}>
                  <Grid item xs container direction="column" spacing={2}>
                    <Link
                      to={`/products/${favorite.name
                        .replace(URL_REGEX, '-')
                        .toLowerCase()}-i.${favorite.productId}`}
                      className={props.classes.favoriteItems}
                    >
                      <Grid container spacing={2}>
                        <Grid item>
                          <img src={favorite?.image} width={80} alt="" />
                        </Grid>
                        <Grid item xs={12} sm container>
                          <Grid
                            item
                            xs
                            container
                            direction="column"
                            spacing={2}
                          >
                            <Grid item xs>
                              <Typography
                                gutterBottom
                                fontSize={18}
                                sx={{
                                  textDecoration: 'none',
                                  color: 'black!important',
                                }}
                              >
                                {favorite?.name}
                              </Typography>
                              <Typography
                                color="error"
                                fontWeight="bold"
                                fontSize={20}
                              >
                                {Intl.NumberFormat('vi-VN', {
                                  style: 'currency',
                                  currency: 'VND',
                                }).format(favorite?.price)}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Link>
                  </Grid>

                  <Grid item>
                    <Box>
                      <Button
                        color="black"
                        variant="contained"
                        component="label"
                        style={{ color: 'white' }}
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteFav(favorite?.productId)}
                      >
                        Bỏ thích
                      </Button>
                    </Box>{' '}
                  </Grid>
                </Grid>
              </Box>
              <Divider />
            </div>
          ))}
        </Container>
      )}
    </>
  );
};

export default Favorites;
