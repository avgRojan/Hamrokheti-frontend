// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Rating from '@mui/material/Rating'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import AlertTitle from '@mui/material/AlertTitle'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import useMediaQuery from '@mui/material/useMediaQuery'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import { styled, useTheme } from '@mui/material/styles'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import {useDispatch, useSelector} from "react-redux";
import {calculateCheckoutTotalPrice, moveToCart} from "../../../../redux/apps/cart";
import toast from "react-hot-toast";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import formatMoney from "../../../../utils/formatMoney";

const StyledList = styled(List)(({ theme }) => ({
  padding: 0,
  '& .MuiListItem-root': {
    padding: theme.spacing(6),
    border: `1px solid ${theme.palette.divider}`,
    '&:first-of-type': {
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6
    },
    '&:last-of-type': {
      borderBottomLeftRadius: 6,
      borderBottomRightRadius: 6
    },
    '&:not(:last-of-type)': {
      borderBottom: 0
    },
    '& .MuiListItemText-root': {
      marginTop: 0,
      marginBottom: theme.spacing(4),
      '& .MuiTypography-root': {
        color: theme.palette.text.secondary
      }
    },
    '& .remove-item': {
      top: '0.5rem',
      right: '0.625rem',
      position: 'absolute',
      color: theme.palette.text.disabled
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  }
}))

const StepCart = ({ handleNext }) => {
  // ** Hooks
  const theme = useTheme()
  const breakpointMD = useMediaQuery(theme => theme.breakpoints.between('sm', 'lg'))

  const {checkout, cart, totalPriceCheckout} = useSelector(state=> state.cart)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    dispatch(calculateCheckoutTotalPrice())
  }, [checkout]);

  const handleMoveToCart = (item) => {
    dispatch(moveToCart(item))
  }

  if(checkout.length <= 0){
    toast.error('You need to move cart products to checkout first')
    router.push('/products/cart')

    return
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={8}>
        <Alert severity='success' icon={<Icon icon='tabler:bookmarks' />} sx={{ mb: 4 }}>
          <AlertTitle>Note:</AlertTitle>
          <div>
            <Typography sx={{ color: 'success.main' }}>
              - Your cart items are now in checkout, you can click on the move to cart button to move this item to cart
            </Typography>
            <Typography sx={{ color: 'success.main' }}>
              - Delivery partner may take you some delivery charges, you can pay the delivery partner to your doorstep
            </Typography>
          </div>
        </Alert>
        <Typography variant='h5' sx={{ mb: 4 }}>
          My Shopping Bag ({checkout?.length ?? 0} Items)
        </Typography>
        <StyledList sx={{ mb: 4 }}>
          {checkout?.map((item, index) => <ListItem key={index}>
            <ListItemAvatar sx={{display: 'flex', '& img': {my: 5, mx: 8}}}>
              <img height={100} src={item?.image} alt='Google Home'/>
            </ListItemAvatar>
            <IconButton size='small' className='remove-item' sx={{color: 'text.primary'}}>
              <Icon icon='tabler:x' fontSize={20}/>
            </IconButton>
            <Grid container>
              <Grid item xs={12} md={8}>
                <ListItemText primary={item?.name}/>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <Typography sx={{mr: 2, color: 'text.disabled'}}>Sold By:</Typography>
                  <Typography
                    href='/'
                    component={Link}
                    onClick={e => e.preventDefault()}
                    sx={{mr: 4, color: 'primary.main', textDecoration: 'none'}}
                  >
                    {
                      item?.user
                    }
                  </Typography>
                  <CustomChip
                    rounded
                    size='small'
                    skin='light'
                    color='success'
                    label={item?.status ?? 'In Stock'}
                  />
                </Box>
                <Box>
                  <Typography><strong>Quantity:</strong> {item?.quantity ?? 0}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4} sx={{mt: [6, 6, 8]}}>
                <Box
                  sx={{
                    gap: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: {xs: 'flex-start', md: 'flex-end'}
                  }}
                >
                  <Box sx={{display: 'flex'}}>
                    <Typography sx={{color: 'primary.main'}}>Rs {formatMoney(item?.price) ?? 0 }</Typography>
                    {/*<Typography sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>/$359</Typography>*/}
                  </Box>
                  <Button
                    onClick={()=> handleMoveToCart(item)}
                    variant='tonal'
                    size='small'
                    disabled={cart?.some(cartItem => cartItem?.product_id === item?.product_id)}
                  >
                    {cart?.some(cartItem => cartItem?.product_id === item?.product_id) ? 'Moved' : 'Move to cart'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </ListItem>)}
        </StyledList>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Box sx={{ mb: 4, borderRadius: 1, border: theme => `1px solid ${theme.palette.divider}` }}>
          <CardContent>
            <Typography sx={{ mb: 4 }} variant='h6'>
              Price Details
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box
                sx={{
                  mb: 2,
                  gap: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography>Total Products</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{checkout?.length ?? 0}</Typography>
              </Box>

              <Box
                sx={{
                  mb: 2,
                  gap: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography>Order Total</Typography>
                <Typography sx={{ color: 'text.secondary' }}>Rs.{formatMoney(totalPriceCheckout) ?? 0}</Typography>
              </Box>
            </Box>
          </CardContent>
          <Divider sx={{ my: '0 !important' }} />
          <CardContent sx={{ py: theme => `${theme.spacing(3.5)} !important` }}>
            <Box
              sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Typography sx={{ fontWeight: 500 }}>Total</Typography>
              <Typography sx={{ fontWeight: 500 }}>Rs.{formatMoney(totalPriceCheckout) ?? 0}</Typography>
            </Box>
          </CardContent>
        </Box>
        <Box sx={{ display: 'flex', ...(breakpointMD ? { justifyContent: 'flex-end' } : {}) }}>
          <Button fullWidth={!breakpointMD} variant='contained' onClick={handleNext}>
            Next
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default StepCart
