// ** MUI Imports
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import {useState} from "react";
import { useGetAllDeliveryPartnersQuery} from "../../../../redux/apps/profile/profileApi";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedPartner} from "../../../../redux/apps/cart";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FarmerLoader from "../../../component/loading/FarmerLoader";

const StyledList = styled(List)(({ theme }) => ({
  '& .MuiListItem-container': {
    border: `1px solid ${theme.palette.divider}`,
    '&:first-of-type': {
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius
    },
    '&:last-child': {
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius
    },
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '& .MuiListItem-root': {
      paddingRight: theme.spacing(24)
    },
    '& .MuiListItemText-root': {
      marginTop: 0,
      '& .MuiTypography-root': {
        fontWeight: 500
      }
    }
  }
}))

const ListPartnersCheckout = () => {
  const dispatch = useDispatch()
  const {selectedPartner} = useSelector(state=> state.cart)

  const {data, isLoading} = useGetAllDeliveryPartnersQuery()

  const handleSelectButtonClick = (item) => {
    dispatch(setSelectedPartner(item))
  }

  return (
    <StyledList disablePadding>
      {
        isLoading && <FarmerLoader />
      }
      {data?.length === 0 ? <Box sx={{
        mt: 4
      }}>
        <Card sx={{
          backgroundColor: '#0B9BE3'
        }}>
          <CardContent>
            <Typography sx={{
              color: 'white',
              fontWeight: 500
            }}>There are no delivery partner registered right now.
              Sorry 😌 for your inconvenience !
            </Typography>
          </CardContent>
        </Card>
      </Box> : data?.map((item, index)=> <ListItem key={index}>
        <ListItemAvatar>
          <Avatar src={item?.profile_image ?? '/images/avatars/2.png'} alt='Caroline Black'/>
        </ListItemAvatar>
        <div>
          <ListItemText primary={item?.full_name ?? ''}/>
          <Typography sx={{fontWeight: 500, color: 'text.secondary'}}>
            Delivery Charge:
            <span style={{fontWeight: 700, color: 'primary'}}> Rs. {item?.delivery_charge ?? 0} </span>
          </Typography>
        </div>
        <ListItemSecondaryAction>
          <Button
            disabled={selectedPartner !== null}
            variant='contained'
            size='small'
            onClick={(event) => handleSelectButtonClick(item)}
          >
            {selectedPartner !== null ? 'Selected' : 'Select'}
          </Button>
        </ListItemSecondaryAction>
      </ListItem>)}
    </StyledList>
  )
}

export default ListPartnersCheckout
