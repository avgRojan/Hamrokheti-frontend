import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import {Stack} from "@mui/system";
import IconButton from "@mui/material/IconButton";
import {Icon} from "@iconify/react";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {calculateTotalPrice, decreaseQuantity, increaseQuantity, moveToCheckout} from "../../redux/apps/cart";
import toast from "react-hot-toast";
import {useRouter} from "next/router";
import formatMoney from "../../utils/formatMoney";

const CartPage = () => {

  const {cart, totalPrice, checkout} = useSelector(state=> state.cart)
  const {quantity} = cart
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubQuantity = (item) => {
    dispatch(decreaseQuantity({
      product_id: item.product_id,
    }))
  }

  const handleAddQuantity = (item) => {
    dispatch(increaseQuantity({
      product_id: item.product_id,
    }))
  }

  useEffect(()=>{
    dispatch(calculateTotalPrice())
  },[cart])

  if(cart?.length === 0 && checkout?.length === 0){
    toast.error('Kindly add some product to cart first')
    router.push('/products')

    return
  }

  const handleCheckoutButtonClick = () => {
    dispatch(moveToCheckout(cart))
    router.push('/products/checkout')
  }

  return (
    <Box sx={{
      mx: 0,
      display:'flex',
      gap: 10
    }}>
      <Card sx={{width: '100%'}}>
        <CardHeader
          title={<Typography variant={'h4'}>My Cart </Typography>}
        />
        <Divider />
        <CardContent>
          {cart.length > 0 && cart.map((product,index)=> <>
            <Box sx={{
              display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'space-between', my: 2
            }}>
              <Box sx={{
                display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center'
              }}>
                <img style={{
                  height: 50, width: 100,
                  objectFit: 'cover',
                  borderRadius: 10
                }} src={product?.image} alt={product?.name}/>
                <Stack>
                  <Typography variant={'h5'} > {product?.name}</Typography>
                  <Typography variant={'body2'}>{product?.category}</Typography>
                </Stack>
                <Stack>
                  <Typography variant={'h5'} color={'secondary'}>Rs. {formatMoney(product?.price * product?.quantity) }</Typography>
                  <Box sx={{
                    display:'flex', gap: 4
                  }}>
                  </Box>
                </Stack>
              </Box>

                <Box sx={{
                  display: 'flex',
                  gap: 6,
                  alignItems: 'center'
                }}>
                  <IconButton
                    disabled={quantity <= 0}
                    sx={{
                      fontSize: 12,
                      backgroundColor: 'black',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'white',
                        color: 'black'
                      }
                    }}
                    onClick={()=> handleSubQuantity(product, index)}
                  >
                    <Icon icon={'mdi:minus'} />
                  </IconButton>
                  <Typography fontSize={14} fontWeight={500}>{product?.quantity} </Typography>
                  <IconButton
                    sx={{
                      fontSize: 12,
                      backgroundColor: 'black',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'white',
                        color: 'black'
                      }
                    }} variant={'tonal'}
                    onClick={()=> handleAddQuantity(product, index)}
                  >
                    <Icon icon={'mdi:plus'} />
                  </IconButton>
                </Box>
            </Box>
          </>)}
          <Divider sx={{
            my: 2
          }}/>

        </CardContent>
      </Card>
      <Card sx={{
        width: '50%',
        height: '50%'
      }}>
        <CardHeader
          title={<Typography variant={'h4'}>Order Summary </Typography>}
          subheader={<Typography variant={'body2'}>
            Total Items:  {cart?.length ?? 0}
          </Typography>}
        />
        <Divider />
        <CardContent>
          <Box sx={{
            display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'space-between',my: 4
          }}>
            <Typography variant={'h4'} color={'primary'}>Total</Typography>
            <Typography variant={'h4'} color={'primary'}>Rs.{formatMoney(totalPrice) ?? 0}</Typography>
          </Box>
          <Button onClick={handleCheckoutButtonClick} fullWidth variant={'contained'} color={'secondary'}> Proceed to Checkout</Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CartPage;
