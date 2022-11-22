import DeleteIcon from "@mui/icons-material/Delete";

import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography
} from "@mui/material";
import { Link } from 'react-router-dom';

import React from "react";

const Favorites = (props) => {
  return (
    <>
      <Box sx={{ display: "flex", mb: 1 }}>
        <Box sx={{ flexGrow: 1 }} className={props.classes.title}>
          Sản phẩm yêu thích
        </Box>
      </Box>

      <Divider />

      <Container sx={{ mt: 3 }}>
        {props.favorites.map((favorite, i) => (
          <div key={i}>
            <Box>
              <Grid container spacing={2} sx={{ mb: 3, mt: 4 }}>
              <Grid item xs container direction="column" spacing={2}  >
              <Link to="/products/1" className={props.classes.favoriteItems}> 

                  <Grid container spacing={2}>
                    <Grid item>
                      <img src={favorite.img} width={80} alt="" />
                    </Grid>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography gutterBottom fontSize={18} sx={{ textDecoration:"none", color: "black!important" }}>
                            {favorite.name}
                          </Typography>
                          <Typography 
                            color="error" 
                            fontWeight="bold"
                            fontSize={20}
                        >
                            {
                                Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                                }).format(favorite.price)
                            }
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
                      style={{ color: "white" }}
                      startIcon={<DeleteIcon />}
                    >
                      Bỏ thích
                    </Button>
                  </Box>{" "}
                </Grid>
              </Grid>
            </Box>
            <Divider />
          </div>
        ))}
      </Container>
    </>
  );
};

export default Favorites;
