import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import StarsIcon from '@mui/icons-material/Stars';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Stack,
  Tab,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetAllOrdersQuery } from '../../services/orderApis';
import {
  ORDER_STATUS,
  URL_REGEX,
  COLOR_LIST,
} from '../../utils/globalVariables';
import RatingDialog from './RatingDialog';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { StickyNote2 } from '@mui/icons-material';
import useStyles from './styles';

const Orders = (props) => {
  const classes = useStyles();
  const [orderStatus, setOrderStatus] = useState('');
  const [openRatingDialog, setOpenRatingDialog] = useState(false);

  const { data: allUserOrders, isFetching: isFetchingUserOrders } =
    useGetAllOrdersQuery(orderStatus);

  useEffect(() => {
    if (props.navSelection === 'orders') {
      props.setTabValue('1');
      setOrderStatus('');
    }
  }, [props.navSelection]);

  const handleCloseRatingDialog = () => {
    setOpenRatingDialog(false);
  };

  const handleClickRate = (id) => {
    setOpenRatingDialog(id);
  };

  const handleChangeTab = (event, newValue) => {
    props.setTabValue(newValue);
    if (newValue === '1') {
      setOrderStatus('');
      return;
    }
    setOrderStatus(newValue);
  };

  return (
    <>
      <Box sx={{ display: 'flex', mb: 1 }}>
        <Box sx={{ flexGrow: 1 }} className={props.classes.title}>
          <TabContext value={props.tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChangeTab}>
                <Tab label="Tất cả" value="1" />
                <Tab label="Chờ xác nhận" value={ORDER_STATUS.pending.status} />
                <Tab label="Đang giao" value={ORDER_STATUS.delivering.status} />
                <Tab label="Đã giao" value={ORDER_STATUS.done.status} />
                <Tab label="Đã hủy" value={ORDER_STATUS.canceled.status} />
              </TabList>
            </Box>

            <TabPanel value="1" className={classes.emptyTabPanel}></TabPanel>
            <TabPanel
              value={ORDER_STATUS.pending.status}
              className={classes.emptyTabPanel}
            ></TabPanel>
            <TabPanel
              value={ORDER_STATUS.delivering.status}
              className={classes.emptyTabPanel}
            ></TabPanel>
            <TabPanel
              value={ORDER_STATUS.done.status}
              className={classes.emptyTabPanel}
            ></TabPanel>
            <TabPanel
              value={ORDER_STATUS.canceled.status}
              className={classes.emptyTabPanel}
            ></TabPanel>
          </TabContext>
          <Container
            sx={{
              mt: 0,
              height: '460px',
              overflow: allUserOrders?.length > 0 ? 'scroll' : 'none',
            }}
          >
            {isFetchingUserOrders ? (
              <Box display="flex" justifyContent="center">
                <CircularProgress color="black" size="4rem" />
              </Box>
            ) : allUserOrders?.length === 0 ? (
              <>
                <Stack
                  mt={5}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                >
                  <StickyNote2 />
                  <Typography fontSize={23} sx={{ color: 'black!important' }}>
                    Chưa có đơn hàng
                  </Typography>
                </Stack>
              </>
            ) : (
              allUserOrders?.map((order, i) => (
                <div key={i} style={{ marginTop: i > 0 ? '40px' : '0px' }}>
                  {order.transactionMapper.map((product, proIndex) => (
                    <Box key={`pro${proIndex}`}>
                      <Grid container spacing={2} sx={{ mb: 0, mt: 1 }}>
                        <Grid item xs container direction="column" spacing={2}>
                          <Link
                            to={`/products/${product.productName
                              .replace(URL_REGEX, '-')
                              .toLowerCase()}-i.${product.productId}`}
                            className={props.classes.favoriteItems}
                          >
                            <Grid container spacing={2}>
                              <Grid item sx={{ paddingLeft: '32px!important' }}>
                                <img
                                  src={product?.productImage}
                                  width={80}
                                  alt=""
                                />
                              </Grid>
                              <Grid item xs>
                                <Typography
                                  fontSize={18}
                                  gutterBottom
                                  component="div"
                                  sx={{ color: 'black!important' }}
                                >
                                  {product?.productName}
                                </Typography>
                                <Typography color="text.secondary">
                                  Phân loại hàng:{' '}
                                  {
                                    COLOR_LIST.find(
                                      (item) => item.color === product?.color,
                                    ).name
                                  }{' '}
                                  - {product?.size}
                                </Typography>
                                <Typography color="text.secondary">
                                  x{product?.tranQuantity}
                                </Typography>
                                <Typography
                                  color="error"
                                  fontWeight="bold"
                                  fontSize={20}
                                >
                                  {Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                  }).format(product?.tranUnitPrice)}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Link>
                        </Grid>

                        <Grid item>
                          {order?.ordStatus === ORDER_STATUS.done.status ? (
                            product?.commented ? (
                              <Button
                                color="black"
                                variant="contained"
                                component="label"
                                style={{ color: 'white' }}
                                startIcon={<StarsIcon />}
                                disabled
                              >
                                Đã đánh giá
                              </Button>
                            ) : (
                              <Box>
                                <Button
                                  color="black"
                                  variant="contained"
                                  component="label"
                                  style={{ color: 'white' }}
                                  startIcon={<StarsIcon />}
                                  onClick={() => handleClickRate(product?.id)}
                                >
                                  Đánh giá
                                </Button>
                                <RatingDialog
                                  classes={props.classes}
                                  open={openRatingDialog === product?.id}
                                  onClose={handleCloseRatingDialog}
                                  orderDetails={product}
                                  toastData={props.toastData}
                                  setToastData={props.setToastData}
                                  openToast={props.openToast}
                                  setOpenToast={props.setOpenToast}
                                  handleCloseToast={props.handleCloseToast}
                                />
                              </Box>
                            )
                          ) : (
                            <></>
                          )}
                        </Grid>
                      </Grid>
                      <Divider />
                    </Box>
                  ))}
                  <Divider />
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ background: '#Fbf9f8' }}
                  >
                    <Stack p={1} width="400px">
                      <Typography fontWeight="bold" fontSize={16}>
                        SĐT: {order?.ordPhone}
                      </Typography>
                      <Typography color="text.secondary">
                        {order?.ordAddress}
                      </Typography>
                      <Typography color="text.secondary">
                        {order?.ordDate}
                      </Typography>
                    </Stack>
                    <Chip
                      color={
                        Object.values(ORDER_STATUS).find(
                          (o) => o.status === order?.ordStatus,
                        ).color
                      }
                      variant="outlined"
                      icon={<FiberManualRecordIcon />}
                      label={
                        Object.values(ORDER_STATUS).find(
                          (o) => o.status === order?.ordStatus,
                        ).string
                      }
                    />

                    <Typography
                      p={1}
                      color="error"
                      fontWeight="bold"
                      fontSize={22}
                    >
                      {Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(order?.ordTotalPrice + order?.ordShippingFee)}
                    </Typography>
                  </Stack>
                  <Divider />
                </div>
              ))
            )}
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Orders;
