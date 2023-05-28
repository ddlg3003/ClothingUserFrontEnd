import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
  Box,
} from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import useStyles from './styles';
import DeleteAlertDialog from './DeleteAlertDialog';
import { useDispatch, useSelector } from 'react-redux';
import {
  PRODUCT_QUERY_STRING,
  URL_REGEX,
  COLOR_LIST,
} from '../../utils/globalVariables';
import { Link } from 'react-router-dom';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import {
  useGetCartQuery,
  useIncreaseCartItemMutation,
  useDecreaseCartItemMutation,
  useDeleteCartItemMutation,
} from '../../services/cartApis';
import { updateCheckout } from '../../features/checkout';

const Cart = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [openDeleteItemDialog, setOpenDeleteItemDialog] = useState('');

  const { data: dataCartList, isFetching: isFetchingCartList } =
    useGetCartQuery();

  const [increaseCartItem] = useIncreaseCartItemMutation();
  const [decreaseCartItem] = useDecreaseCartItemMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();

  // const datas = useSelector((state) => state.cart.data);

  const handleCloseDeleteItem = () => {
    setOpenDeleteItemDialog('');
  };

  // Handle show dialog
  const handleClickDeleteItem = (i) => {
    setOpenDeleteItemDialog(i);
  };

  const handleConfirmDeleteClick = async ({ color, size, productId }) => {
    await deleteCartItem({ color, size, productId }).unwrap();
    setOpenDeleteItemDialog('');
  };

  const handleIncrease = async ({ color, size, product_id: productId }) => {
    const product = dataCartList?.find(
      (item) =>
        item?.color === color &&
        item?.size === size &&
        item?.product_id === productId,
    );

    if (product.quantity < product.availableQuantity) {
      await increaseCartItem({ color, size, productId }).unwrap();
    }
  };

  const handleDecrease = async (
    { color, size, product_id: productId, quantity },
    i,
  ) => {
    if (quantity === 1) {
      handleClickDeleteItem(i);
      return;
    }
    await decreaseCartItem({ color, size, productId }).unwrap();
  };

  const handleBuyButton = () => {
    if (dataCartList?.length) {
      dispatch(updateCheckout());
      console.log('hehe');
      sessionStorage.setItem('cartItems', JSON.stringify(dataCartList));
    }
  };

  return (
    <>
      <div className={classes.root}>
        <Typography
          letterSpacing="2px"
          fontSize="25px"
          fontWeight="normal"
          align="center"
          paddingBottom="40px"
          paddingTop="60px"
        >
          GIỎ HÀNG
        </Typography>{' '}
        <Container size="md" sx={{ minHeight: '400px' }}>
          <TableContainer component={Paper}>
            <Table className={classes.itemsTable} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" width={120}>
                    <Typography fontSize="17px">Sản Phẩm</Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ width: '200px' }}></TableCell>
                  <TableCell align="left" sx={{ width: '130px' }}>
                    <Typography fontSize="17px">Đơn Giá</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontSize="17px">Số Lượng</Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ width: '130px' }}>
                    <Typography fontSize="17px">Số Tiền</Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ width: '80px' }}>
                    <Typography width={80} fontSize="17px">
                      Thao Tác
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>

              {!dataCartList?.length ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <LocalMallIcon sx={{ fontSize: 70, mt: 2 }} />
                      <Typography
                        fontWeight="bold"
                        width={80}
                        fontSize="20px"
                        sx={{ width: '200px', margin: 'auto' }}
                      >
                        Không có sản phẩm
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {dataCartList?.map((data, i) => (
                    <TableRow
                      key={i}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <div>
                          <Link
                            to={`/products/${data?.proName
                              .replace(URL_REGEX, '-')
                              .toLowerCase()}-i.${data?.product_id}`}
                            className={classes.itemLink}
                          >
                            <img width={80} src={data?.proImage} alt="" />
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Stack direction="column">
                          <Link
                            to={`/products/${data?.proName
                              .replace(URL_REGEX, '-')
                              .toLowerCase()}-i.${data?.product_id}`}
                            className={classes.itemLink}
                          >
                            <Typography
                              fontSize="16px"
                              maxWidth={300}
                              className={classes.itemName}
                              sx={{ color: '#000' }}
                            >
                              {data?.proName}
                            </Typography>
                            <Typography
                              fontSize="16px"
                              color="text.secondary"
                              maxWidth={200}
                              className={classes.itemName}
                            >
                              Màu:{' '}
                              {
                                COLOR_LIST.find(
                                  (item) => item.color === data?.color,
                                )?.name
                              }
                            </Typography>
                            <Typography
                              fontSize="16px"
                              color="text.secondary"
                              maxWidth={200}
                              className={classes.itemName}
                            >
                              Kích cỡ: {data?.size}
                            </Typography>
                          </Link>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        <Typography className={classes.itemName} fontSize={18}>
                          {Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(data?.price)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center" width={170}>
                        <IconButton
                          size="small"
                          onClick={() => handleDecrease(data, i)}
                        >
                          <RemoveIcon
                            fontSize="inherit"
                            className={classes.removeItemButton}
                          />
                        </IconButton>
                        <input
                          disabled={true}
                          readOnly={true}
                          onChange={() => {}}
                          value={data?.quantity}
                          className={classes.inputField}
                        />
                        <IconButton
                          size="small"
                          onClick={() => handleIncrease(data)}
                        >
                          <AddIcon
                            fontSize="inherit"
                            className={classes.removeItemButton}
                          />
                        </IconButton>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          className={classes.itemName}
                          color="error"
                          fontSize={18}
                        >
                          {Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(data?.price * data?.quantity)}
                        </Typography>
                      </TableCell>
                      <TableCell width={100} align="left">
                        <IconButton
                          size="large"
                          onClick={() => handleClickDeleteItem(i)}
                        >
                          <ClearIcon
                            fontSize="inherit"
                            color="error"
                            className={classes.removeItemButton}
                          />
                        </IconButton>
                        <DeleteAlertDialog
                          open={openDeleteItemDialog === i}
                          onClose={handleCloseDeleteItem}
                          item={data}
                          handleConfirmDeleteClick={handleConfirmDeleteClick}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Container>
      </div>

      <div className={classes.buttonContainer}>
        <div className={classes.totalText}>
          <Typography fontSize="20px">Tổng thanh toán:</Typography>

          <Typography
            color="error"
            className={classes.title}
            fontWeight="bold"
            fontSize={20}
          >
            {Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(
              isFetchingCartList
                ? 0
                : dataCartList?.reduce((acc, data) => {
                    return (acc = acc + data?.price * data?.quantity);
                  }, 0),
            )}
          </Typography>
        </div>
        <div>
          <Button
            size="large"
            variant="outlined"
            color="black"
            onClick={handleBuyButton}
            component={Link}
            disabled={isFetchingCartList}
            to={
              dataCartList?.length
                ? '/checkout'
                : `/products?${PRODUCT_QUERY_STRING.page}=${1}`
            }
            className={classes.checkoutButton}
          >
            Mua Hàng
          </Button>
        </div>
      </div>
    </>
  );
};

export default Cart;
