import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import {Stack} from "@mui/system";
import IconButton from "@mui/material/IconButton";
import {Icon} from "@iconify/react";
import {DataGrid} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {useDispatch} from "react-redux";
import toast from "react-hot-toast";
import {
  useDeliveredOrderMutation,
  useGetPartnersOrderQuery,
  useProcessingOrderMutation,
  useRejectOrderMutation, useShippedOrderMutation
} from "../../../../redux/apps/orders/ordersApi";
import DialogConfirmation from "../../../../views/component/dialog/DialogConfirmation";
import FarmerLoader from "../../../../views/component/loading/FarmerLoader";
import getStatusColor from "../../../../utils/getStatusColor";
import formatMoney from "../../../../utils/formatMoney";

const PartnerOrderRequestPage = () => {
  const {data, isLoading} = useGetPartnersOrderQuery()
  const [selectedRow, setSelectedRow] = useState(null)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [anchorEl, setAnchorEl] = useState(null)
  const [showShippedDialog, setShowShippedDialog] = useState(false)
  const [showDeliveredDialog, setShowDeliveredDialog]= useState(false)

  const dispatch = useDispatch()
  const [shippedOrder, {data: shippedData, isSuccess, isError, error}] = useShippedOrderMutation()

  const [deliverOrder, {data: deliverData,isSuccess: isSuccessDelivered,
    isError: isErrorDelivered,error: errorDelivered}] = useDeliveredOrderMutation()


  const handleShowShippedDialog = (show) => {
    setShowShippedDialog(show)
  }

  const handleShowDeliveredDialog = show => {
    setShowDeliveredDialog(show)
  }

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleShipped = () =>{
    shippedOrder(selectedRow.id)
    setShowShippedDialog(false)
    handleClose()
  }

  const handleDelivered = () =>{
    deliverOrder(selectedRow.id)
    setShowDeliveredDialog(false)
    handleClose()
  }

  useEffect(()=>{
    if(isSuccess){
      toast.success(shippedData?.message)
    }
    if(isError){
      toast.error(error?.data?.message)
    }

  },[isSuccess, isError])

  useEffect(()=>{
    if(isSuccessDelivered){
      toast.success(deliverData?.message)
    }
    if(isErrorDelivered){
      toast.error(errorDelivered?.data?.message)
    }

  },[isSuccessDelivered, isErrorDelivered])


  const columns = [
    {
      flex: 0.15,
      minWidth: 220,
      field: 'order_name',
      headerName: 'ORDER NAME',
      renderCell: params => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', m:0, p:0 }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600, fontSize: 16 }}>
                {row?.order_items[0]?.product_name} <br />
                {row?.order_items.length > 1 && <Typography fontSize={12} variant={'subtitle1'}>
                  and {row?.order_items.length - 1} more
                </Typography>}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.125,
      field: 'totalPrice',
      minWidth: 110,
      headerName: 'total price',
      renderCell: ({ row }) => (
        <Stack>
          <Typography variant='body2' fontSize={14} sx={{ color: 'text.primary' }}>
            Rs. {formatMoney(row?.total_price)}
          </Typography>
        </Stack>
      )
    },
    {
      flex: 0.12,
      minWidth: 110,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => (
        <Typography
          variant='body2'
          fontSize={14}
          sx={{
            color: getStatusColor(row?.status).color,
            backgroundColor: getStatusColor(row?.status).bgColor,
            py: 0.2,
            px: 1,
            borderRadius: 2,
            fontWeight: 500,
            textAlign: 'center',
            textTransform: 'capitalize',
            letterSpacing: 0.5,
          }}
        >
          {
            row?.status
          }
        </Typography>
      )
    },
    {
      flex: 0.125,
      field: ' createdAt',
      minWidth: 110,
      headerName: 'Created At',
      renderCell: ({ row }) => (
        <Stack>
          <Typography variant='body2' fontSize={14} sx={{ color: 'text.primary' }}>
            {row?.created_at ? dayjs(row?.created_at).format('YYYY-MM-DD hh:mm:ss A'): ''}
          </Typography>
        </Stack>
      )
    },
    {
      flex: 0.125,
      field: 'action',
      minWidth: 110,
      headerName: 'Actions',
      disableExport: true,
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex' }}>
          <IconButton onClick={handleClick} sx={{ color: 'text.primary', opacity: 0.8, fontSize: 20 }}>
            <Icon icon={'tabler:dots-vertical'} />
          </IconButton>
        </Box>
      )
    }
  ]


  return (
    <>
      <Card>
        <CardHeader
          title={<Typography variant={'h4'}>Order Request</Typography>}
        />
        <DialogConfirmation
          show={showShippedDialog}
          handleDialog={handleShowShippedDialog}
          handleConfirmation={handleShipped}
        />

        <DialogConfirmation
          show={showDeliveredDialog}
          handleDialog={handleShowDeliveredDialog}
          handleConfirmation={handleDelivered}
        />

        <Menu
          keepMounted
          id='simple-menu'
          anchorEl={anchorEl}
          onClose={handleClose}
          open={Boolean(anchorEl)}>
          {selectedRow?.status !== 'shipped' && selectedRow?.status !== "delivered" && selectedRow?.status !== "rejected" && selectedRow?.status !== "completed"
            && <MenuItem onClick={e => setShowShippedDialog(true)}>
            Shipped Order
          </MenuItem>}
          {selectedRow?.status === 'shipped' && selectedRow?.status !== 'delivered' && <MenuItem onClick={e => setShowDeliveredDialog(true)}>
            Delivered Order
          </MenuItem>}
        </Menu>
        <CardContent>
          {
            isLoading ?
              <FarmerLoader /> :
              <DataGrid
                autoHeight
                columns={columns}
                pageSizeOptions={[10, 25, 50, 100]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                onRowClick={({row})=> setSelectedRow(row)}
                rows={data || []}
                sx={{
                  '& .MuiSvgIcon-root': {
                    fontSize: '1.125rem'
                  }
                }}
              />
          }
        </CardContent>
      </Card>
    </>
  );
}

export default PartnerOrderRequestPage;
