import {
  useCompleteOrderMutation,
  useGetFarmersOrderQuery,
  useProcessingOrderMutation,
  useProcessingOrderQuery, useRejectOrderMutation
} from "../../../redux/apps/orders/ordersApi";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import {Stack} from "@mui/system";
import formatMoney from "../../../utils/formatMoney";
import getStatusColor from "../../../utils/getStatusColor";
import IconButton from "@mui/material/IconButton";
import {Icon} from "@iconify/react";
import FarmerLoader from "../../../views/component/loading/FarmerLoader";
import {DataGrid} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DialogConfirmation from "../../../views/component/dialog/DialogConfirmation";
import {useDispatch} from "react-redux";
import toast from "react-hot-toast";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {Tab} from "@mui/material";
import DialogGetPartnerInfo from "../../../views/pages/order/DialogGetPartnersInfo";
import DialogGetCustomerInfo from "../../../views/pages/order/DialogGetCustomerInfo";

const OrderRequestPage = () => {
  const {data, isLoading} = useGetFarmersOrderQuery()
  const [selectedRow, setSelectedRow] = useState(null)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [anchorEl, setAnchorEl] = useState(null)
  const [showProcessOrderDialog, setProcessOrderDialog] = useState(false)
  const [showRejectOrderDialog, setShowRejectOrderDialog]= useState(false)
  const [showCompleteOrderDialog, setShowCompleteOrderDialog] = useState(false)
  const [tabValue, setTabValue] = useState('self')
  const [showPartnerInfo, setShowPartnerInfo] = useState(false)
  const [customerInfoDialog, setCustomerInfoDialog] = useState(false)

  const dispatch = useDispatch()
  const [processOrder, {data: processingOrderData, isSuccess, isError, error}] = useProcessingOrderMutation()

  const [rejectOrder, {data: rejectOrderData,isSuccess: isSuccessReject,isError: isErrorReject,error: errorReject}]
    = useRejectOrderMutation()

  const [completeOrder, {data: completeOrderData,isSuccess: isSuccessComplete,isError: isErrorComplete,error: errorComplete}]
    = useCompleteOrderMutation()


  const handleShowPartnerInfo = (show) => {
    setShowPartnerInfo(show)
  }

  const handleCustomerInfoDialog = (show) => {
    setCustomerInfoDialog(show)
  }

  const handleSetProcessOrderDialog = (show) => {
    setProcessOrderDialog(show)
  }

  const handleShowCompleteDialog = show => {
    setShowCompleteOrderDialog(show)
  }

  const handleTabChange = (event,newValue) => {
    setTabValue(newValue)
  }


  const handleShowRejectOrderDialog = show => {
    setShowRejectOrderDialog(show)
  }

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleProcessOrder = () =>{
    processOrder(selectedRow.id)
    setProcessOrderDialog(false)
    handleClose()
  }

  const handleRejectOrder = () =>{
    rejectOrder(selectedRow.id)
    setShowRejectOrderDialog(false)
    handleClose()
  }

  const handleCompleteOrder = () => {
    completeOrder(selectedRow?.id)
    setShowCompleteOrderDialog(false)
    handleClose()
  }

  useEffect(()=>{
    if(isSuccess){
      toast.success(processingOrderData?.message)
    }
    if(isError){
      toast.error(error?.data?.message)
    }

  },[isSuccess, isError])

  useEffect(()=>{
    if(isSuccessReject){
      toast.success(rejectOrderData?.message)
    }
    if(isErrorReject){
      toast.error(errorReject?.data?.message)
    }

  },[isSuccessReject, isErrorReject])

  useEffect(()=>{
    if(isSuccessComplete){
      toast.success(completeOrderData?.message)
    }
    if(isErrorComplete){
      toast.error(errorComplete?.data?.message)
    }

  },[isSuccessComplete, isErrorComplete])

  const hasPaymentType = data?.some(item=> item.payment_type?.toLowerCase() === "complete")


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
      headerName: hasPaymentType ? 'Status/Payment Type' : 'Status',
      renderCell: ({ row }) => (
        <Box sx={{
          display:'flex',
          gap: 3,
          alignItems: 'center'
        }}>
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
    {row?.payment_type && row?.payment_type !== "pending" && <Typography
      variant='body2'
      fontSize={14}
      sx={{
        color: getStatusColor(row?.payment_type).color,
        backgroundColor: getStatusColor(row?.payment_type).bgColor,
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
        row?.payment_type
      }
    </Typography>}
        </Box>
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
          show={showProcessOrderDialog}
          handleDialog={handleSetProcessOrderDialog}
          handleConfirmation={handleProcessOrder}
        />

        <DialogConfirmation
          show={showRejectOrderDialog}
          handleDialog={handleShowRejectOrderDialog}
          handleConfirmation={handleRejectOrder}
        />

        <DialogConfirmation
          show={showCompleteOrderDialog}
          handleDialog={handleShowCompleteDialog}
          handleConfirmation={handleCompleteOrder}
        />

        {showPartnerInfo && <DialogGetPartnerInfo
          show={showPartnerInfo}
          handleDialog={handleShowPartnerInfo}
          row={selectedRow}
        />}

        {customerInfoDialog && <DialogGetCustomerInfo
          handleDialog={handleCustomerInfoDialog}
          show={customerInfoDialog}
          row={selectedRow}
        />}

        <Menu
          keepMounted
          id='simple-menu'
          anchorEl={anchorEl}
          onClose={handleClose}
          open={Boolean(anchorEl)}>
          {selectedRow?.status !== "delivered" && selectedRow?.status !== "completed" && selectedRow?.status !=="processing" && selectedRow?.status !== "rejected" && selectedRow?.status !== "cancelled"
            && selectedRow?.status !== "shipped" && <MenuItem onClick={e => setProcessOrderDialog(true)}>
            Process Order
          </MenuItem>}
          {selectedRow?.status !== "cancelled" && selectedRow?.status !== "delivered" && selectedRow?.status !== "completed" &&  selectedRow?.status !== "processing" && selectedRow?.status !== "rejected" && <MenuItem onClick={e => setShowRejectOrderDialog(true)}>
            Reject Order
          </MenuItem>}
          {selectedRow?.status === "processing" && selectedRow?.type !== "partner" && selectedRow?.status !== "completed" && <MenuItem onClick={e => setShowCompleteOrderDialog(true)}>
            Complete Order
          </MenuItem>}
          {selectedRow?.status !== "cancelled" && selectedRow?.status !== "rejected" &&
            <MenuItem onClick={()=> setCustomerInfoDialog(true)}>
            Get Customer's Info
          </MenuItem>}
          {selectedRow?.type === 'partner' && selectedRow?.status !== "cancelled" && selectedRow?.status !== "rejected"
            &&
            <MenuItem onClick={()=>setShowPartnerInfo(true)}>Get Partner's Info</MenuItem>}

        </Menu>
        <CardContent>
          <TabContext value={tabValue}>
            <TabList onChange={handleTabChange} aria-label='icon tabs example'>
              <Tab value='self' label='BY CUSTOMER' icon={<Icon icon='mdi:selfie' />} />
              <Tab value='partner' label='BY DELIVERY PARTNER' icon={<Icon icon='carbon:delivery' />} />
            </TabList>
            <TabPanel value='self'>
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
                    rows={data?.filter(item=> item.type=== 'self') || []}
                    sx={{
                      '& .MuiSvgIcon-root': {
                        fontSize: '1.125rem'
                      }
                    }}
                  />
              }
            </TabPanel>
            <TabPanel value='partner'>
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
                    rows={data?.filter(item=> item.type=='partner') || []}
                    sx={{
                      '& .MuiSvgIcon-root': {
                        fontSize: '1.125rem'
                      }
                    }}
                  />
              }
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
    </>
  );
}

export default OrderRequestPage;
