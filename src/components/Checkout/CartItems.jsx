import React from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
} from '@mui/material';
import { Container } from '@mui/system';
import { Link } from 'react-router-dom';
import { URL_REGEX, COLOR_LIST } from '../../utils/globalVariables';
import useStyles from './styles';

const CartItems = ({ cartItems }) => {
  const classes = useStyles();

  return (
    <>
      <Container>
        <TableContainer
          className={classes.TableContainer}
          component={Paper}
          elevation={2}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" width={120}>
                  <Typography fontWeight="bold" fontSize="17px">
                    Sản Phẩm
                  </Typography>
                </TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left">
                  {' '}
                  <Typography fontSize="17px">Đơn Giá</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography fontSize="17px">Số Lượng</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography fontSize="17px">Thành Tiền</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow
                  key={item.product_id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <div>
                      <Link
                        to={`/products/${item.proName
                          .replace(URL_REGEX, '-')
                          .toLowerCase()}-i.${item.product_id}`}
                        className={classes.itemLink}
                      >
                        <img width={80} src={item.proImage} alt="" />
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Stack direction="column">
                      <Link
                        to={`/products/${item.proName
                          .replace(URL_REGEX, '-')
                          .toLowerCase()}-i.${item.product_id}`}
                        className={classes.itemLink}
                      >
                        <Typography
                          fontSize="18px"
                          maxWidth={200}
                          className={classes.itemName}
                          sx={{ color: '#000' }}
                        >
                          {item.proName}
                        </Typography>
                        <Typography
                          fontSize="18px"
                          color="text.secondary"
                          maxWidth={200}
                          className={classes.itemName}
                        >
                          {
                            COLOR_LIST.find(
                              (colorItem) => colorItem.color === item.color,
                            )?.name
                          }
                          , {item.size}
                        </Typography>
                      </Link>
                    </Stack>
                  </TableCell>
                  <TableCell align="left">
                    <Typography className={classes.itemName} fontSize={18}>
                      {Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(item.price)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" width={170}>
                    <Typography fontSize="18px" className={classes.itemName}>
                      {item.quantity}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      className={classes.itemName}
                      fontSize={18}
                      color="error"
                    >
                      {Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(item.price * item.quantity)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default CartItems;
