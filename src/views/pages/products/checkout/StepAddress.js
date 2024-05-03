// ** React Imports
import {useEffect, useState} from 'react'
import {v4 as uuidv4} from 'uuid';

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomRadioBasic from 'src/@core/components/custom-radio/basic'
import CustomRadioIcons from 'src/@core/components/custom-radio/icons'
import ListPartnersCheckout from "./ListPartners";
import {useDispatch, useSelector} from "react-redux";
import dayjs from "dayjs";
import {resetCardAndCheckout, setSelectedPartner} from "../../../../redux/apps/cart";
import {useGetUserProfileQuery} from "../../../../redux/apps/profile/profileApi";
import {useRequestOrderMutation} from "../../../../redux/apps/orders/ordersApi";
import LoadingForButton from "../../../component/loading/LoadingForButton";
import toast from "react-hot-toast";
import {useRouter} from "next/router";
import formatMoney from "../../../../utils/formatMoney";
import Crypto from "crypto-js"

const StepAddress = ({ handleNext }) => {
  const {checkout, totalPriceCheckout, selectedPartner} = useSelector(state=> state.cart)
  const [requestOrder, {isLoading, isError, isSuccess, data: requestOrderData, error}] = useRequestOrderMutation()
  // ** Hook
  const theme = useTheme()
  const breakpointMD = useMediaQuery(theme => theme.breakpoints.between('sm', 'lg'))

  const {data: userProfile} = useGetUserProfileQuery()

  const router = useRouter();

  useEffect(() => {
    if(isError){
      toast.error(error?.data?.message)
    }
    if(isSuccess){
      toast.success(requestOrderData?.message)
      if(requestOrderData?.type === "cash"){
        router.push('/settings/my-orders')
      } else if(requestOrderData?.type === "wallet"){

        let transactionUUID = requestOrderData?.data?.transaction_uuid
        const totalPrice = totalPriceCheckout + (selectedPartner?.delivery_charge ?? 0)

        const message = `total_amount=${totalPrice},transaction_uuid=${transactionUUID},product_code=${process.env.NEXT_PUBLIC_ESEWA_PRODUCT_KEY}`

        const hash = Crypto.HmacSHA256(message, process.env.NEXT_PUBLIC_ESEWA_SECRET_KEY);
        const signature = Crypto.enc.Base64.stringify(hash);


        // Set form data
        const formData = {
          amount: totalPrice,
          tax_amount: "0",
          total_amount: totalPrice,
          transaction_uuid: transactionUUID,
          product_code: process.env.NEXT_PUBLIC_ESEWA_PRODUCT_KEY,
          product_service_charge: "0",
          product_delivery_charge: "0",
          success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/products/checkout/success`,
          failure_url: "https://google.com",
          signed_field_names: "total_amount,transaction_uuid,product_code",
          signature: signature
        };

        console.log('form with txnid', formData)

        // Create a hidden form element
        const form = document.createElement('form');
        form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
        form.method = "POST";

        // Append input fields to the form
        Object.keys(formData).forEach(key => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = formData[key];
          form.appendChild(input);
        });

        // Append the form to the document body and submit it
        document.body.appendChild(form);
        form.submit();
        console.log('this is requestdta', requestOrderData)

      }
    }
  }, [isSuccess, isError]);

  const dataIcons = [
    {
      isSelected: true,
      value: 'self',
      title: (
        <Typography variant='h6' sx={{ mb: 1 }}>
          Self
        </Typography>
      ),
      content: (
        <>
          <CustomChip
            rounded
            size='small'
            skin='light'
            label='Free'
            color='success'
            sx={{ top: 12, right: 12, position: 'absolute' }}
          />
          <Typography variant='body2' sx={{ my: 'auto', textAlign: 'center' }}>
            Get your product by yourself.
          </Typography>
        </>
      )
    },
    {
      value: 'partner',
      title: (
        <Typography variant='h6' sx={{ mb: 1 }}>
          Delivery Partner
        </Typography>
      ),
      content: (
        <>
          <CustomChip
            rounded
            label={`Rs. ${selectedPartner?.delivery_charge ?? 0}`}
            size='small'
            skin='light'
            color='secondary'
            sx={{ top: 12, right: 12, position: 'absolute' }}
          />
          <Typography variant='body2' sx={{ my: 'auto', textAlign: 'center' }}>
            Get your product as per partner.
          </Typography>
        </>
      )
    },
  ]

  const deliveryIcon = [
    {
      isSelected: true,
      value: 'cash',
      title: (
        <Typography variant='h6' sx={{ mb: 1 }}>
          Cash
        </Typography>
      ),
      icon: 'tabler:cash',
      iconProps: { fontSize: '2.125rem', style: { marginBottom: 8 }, color: theme.palette.text.secondary },
      content: (
        <>
          <Typography variant='body2' sx={{ my: 'auto', textAlign: 'center' }}>
            Cash on Delivery
          </Typography>
        </>
      )
    },
    {
      value: 'wallet',
      title: (
        <Typography variant='h6' sx={{ mb: 1 }}>
          Wallet (eSewa)
        </Typography>
      ),
      icon: 'arcticons:esewa',
      iconProps: { fontSize: '2.125rem', style: { marginBottom: 8 }, color: theme.palette.text.secondary },
      content: (
        <>
          <Typography variant='body2' sx={{ my: 'auto', textAlign: 'center' }}>
            Choose wallet to checkout
          </Typography>
        </>
      )
    },
  ]

  const data = [
    {
      value: 'address',
      isSelected: true,
      title: userProfile?.full_name,
      meta: <CustomChip rounded size='small' skin='light' label='Self' color='primary' />,
      content: (
        <Box sx={{ mt: 0.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography variant='body2' sx={{ mb: 'auto' }}>
            {userProfile?.address}
          </Typography>
          <Divider sx={{ my: 2.5 }} />
        </Box>
      )
    },
  ]


  const initialIconSelected = dataIcons.filter(item => item.isSelected)[
  dataIcons.filter(item => item.isSelected).length - 1
    ].value


  // ** States
  const initialBasicSelected = data.filter(item => item.isSelected)[data.filter(item => item.isSelected).length - 1]
    .value

  const [selectedIconRadio, setSelectedIconRadio] = useState(initialIconSelected)
  const [selectedBasicRadio, setSelectedBasicRadio] = useState(initialBasicSelected)
  const [selectedCheckoutTypeRadio, setSelectedCheckoutTypeRadio] = useState('cash')



  const icons = [
    {
      icon: 'tabler:users',
      iconProps: { fontSize: '2.125rem', style: { marginBottom: 8 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'tabler:crown',
      iconProps: { fontSize: '2.125rem', style: { marginBottom: 8 }, color: theme.palette.text.secondary }
    }
  ]

  const dispatch = useDispatch()


  const handleBasicRadioChange = prop => {
    if (typeof prop === 'string') {
      setSelectedBasicRadio(prop)
    } else {
      setSelectedBasicRadio(prop.target.value)
    }
  }

  const handleIconRadioChange = prop => {
    if (typeof prop === 'string') {
      setSelectedIconRadio(prop)
    } else {
      setSelectedIconRadio(prop.target.value)
    }
  }

  const handleDeliveryTypeRadioChange = prop => {
    if (typeof prop === 'string') {
      setSelectedCheckoutTypeRadio(prop)
    } else {
      setSelectedCheckoutTypeRadio(prop.target.value)
    }
  }

  const currentDate = new Date()

  useEffect(() => {
    if(selectedIconRadio === 'self'){
      dispatch(setSelectedPartner(null))
    }
  }, [selectedIconRadio]);


  const handleRequestOrder = () => {
    const products = checkout.map(item=>{
      return {
        "product": item.product_id,
        "quantity_ordered": item.quantity,
         price: item.price
      }
    })

    requestOrder({
      "delivery_partner": selectedPartner?.user,
      "total_price": totalPriceCheckout + (selectedPartner?.delivery_charge ?? 0),
        order_items: products,
        status: "pending",
        type: selectedIconRadio === 'partner' ? selectedIconRadio : undefined,
        checkout_type: selectedCheckoutTypeRadio
    }).then(()=>{
      // handleNext()
      dispatch(resetCardAndCheckout())
    })
  }


  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={8}>
        {userProfile?.address && <Box>
          <Typography sx={{mb: 4}} variant='h6'>
            Your Address:
          </Typography>
          <Grid container spacing={4}>
            {data.map((item, index) => (
              <CustomRadioBasic
                key={index}
                data={data[index]}
                name='custom-radios-address'
                selected={selectedBasicRadio}
                gridProps={{sm: 6, xs: 12}}
                handleChange={handleBasicRadioChange}
              />
            ))}
          </Grid>
        </Box>}
        <Box>
          <Typography variant='h6' sx={{ mt: 6, mb: 4 }}>
            Choose Checkout Type
          </Typography>
          <Grid container spacing={4}>
            {deliveryIcon.map((item, index) => (
              <CustomRadioIcons
                key={index}
                data={deliveryIcon[index]}
                icon={deliveryIcon[index].icon}
                selected={selectedCheckoutTypeRadio}
                name='custom-radios-delivery'
                gridProps={{ sm: 4, xs: 12 }}
                iconProps={deliveryIcon[index].iconProps}
                handleChange={handleDeliveryTypeRadioChange}
              />
            ))}
          </Grid>
        </Box>
        <Typography variant='h6' sx={{ mt: 6, mb: 4 }}>
          Choose Delivery Speed
        </Typography>

        <Grid container spacing={4}>
          {dataIcons.map((item, index) => (
            <CustomRadioIcons
              key={index}
              data={dataIcons[index]}
              icon={icons[index].icon}
              selected={selectedIconRadio}
              name='custom-radios-delivery'
              gridProps={{ sm: 4, xs: 12 }}
              iconProps={icons[index].iconProps}
              handleChange={handleIconRadioChange}
            />
          ))}
        </Grid>

        {/*TODO choose delivery partner as required*/}
        {selectedIconRadio === 'partner' && <Box sx={{
          mt: 10
        }}>
          <ListPartnersCheckout/>
        </Box>
        }
      </Grid>
      <Grid item xs={12} lg={4}>
        <Box sx={{ mb: 4, borderRadius: 1, border: theme => `1px solid ${theme.palette.divider}` }}>
          <CardContent>
            <Typography sx={{ mb: 4 }} variant='h6'>
              Estimated Delivery Date
            </Typography>
            {checkout.map((item, index)=><Box key={index} sx={{mb: 4, display: 'flex', alignItems: 'center'}}>
              <Box sx={{mr: 4, display: 'flex', '& img': {m: 2.5}}}>
                <img height={50} src={item?.image} alt={item?.name}/>
              </Box>
              <div>
                <Typography sx={{color: 'text.secondary'}}>{item?.name}</Typography>
                <Typography sx={{fontWeight: 500, color: 'text.secondary'}}>
                  {
                   dayjs(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (selectedPartner?.estimated_delivery_days ?? 0) ))
                     .format('YYYY-MM-DD')
                  }
                </Typography>
              </div>
            </Box>)}
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
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
                <Typography sx={{ color: 'text.secondary' }}> {checkout?.length}</Typography>
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
                <Typography>Total Price</Typography>
                <Typography sx={{ color: 'text.secondary' }}>Rs. {formatMoney(totalPriceCheckout) ?? 0 }</Typography>
              </Box>
              <Box
                sx={{
                  gap: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography>Delivery Charges</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Typography sx={{ mr: 2, color: 'text.disabled' }}>Rs. {selectedPartner === null ? 0 :
                    formatMoney(selectedPartner?.delivery_charge)}</Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
          <CardContent sx={{ py: theme => `${theme.spacing(3.5)} !important` }}>
            <Box
              sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Typography sx={{ fontWeight: 500 }}>Total</Typography>
              <Typography sx={{ fontWeight: 500 }}>Rs. {formatMoney(totalPriceCheckout + (selectedPartner?.delivery_charge ?? 0)) ?? 0 }</Typography>
            </Box>
          </CardContent>
        </Box>
        {isLoading ? <LoadingForButton /> : <Box sx={{display: 'flex', ...(breakpointMD ? {justifyContent: 'flex-end'} : {})}}>
          <Button onClick={handleRequestOrder} fullWidth={!breakpointMD} variant='contained'>
            Place Order
          </Button>
        </Box>}
      </Grid>
    </Grid>
  )
}

export default StepAddress
