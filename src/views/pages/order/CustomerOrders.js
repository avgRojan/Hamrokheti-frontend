
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import {DataGrid} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {Stack} from "@mui/system";
import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";
import {Icon} from "@iconify/react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import toast from "react-hot-toast";
import {
  useCancelOrdersMutation,
  useDeleteOrderMutation,
  useGetCustomerOrdersQuery
} from "../../../redux/apps/orders/ordersApi";
import FarmerLoader from "../../component/loading/FarmerLoader";
import DialogConfirmation from "../../component/dialog/DialogConfirmation";
import getStatusColor from "../../../utils/getStatusColor";
import formatMoney from "../../../utils/formatMoney";


const CustomerOrders = () => {
  const {data, isLoading } = useGetCustomerOrdersQuery()
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [anchorEl, setAnchorEl] = useState(null)
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [cancelOrder, {isLoading:isCancelOrders, data: cancelOrderData, isSuccess, isError, error}] = useCancelOrdersMutation()
  const [deleteOrder, {data: deleteOrderData, isSuccess: isSuccessDelete, error: errorDelete, isError: isErrorDelete}] = useDeleteOrderMutation()

  const handleShowDialogConfirmation = (show) => {
    setShowConfirmationDialog(show)
  }

  const handleShowDeleteDialog = show => {
    setDeleteDialog(show)
  }

  const handleCancelOrder = () => {
    cancelOrder(selectedRow?.id)
    setShowConfirmationDialog(false)
    setAnchorEl(null)

  }

  const handleDeleteOrder = () => {
    deleteOrder(selectedRow?.id)
    setDeleteDialog(false)
    setAnchorEl(null)

  }

  useEffect(() => {
    if(isSuccessDelete){
      toast.success(deleteOrderData?.message)
    }
    if(isErrorDelete){
      toast.error(errorDelete?.data?.message)
    }

  }, [isSuccessDelete, isErrorDelete]);

  useEffect(() => {
    if(isSuccess){
      toast.success(cancelOrderData?.message)
    }
    if(isError){
      toast.error(error?.data?.message)
    }

  }, [isSuccess, isError]);

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const hasCompleteOrder = data?.some(item=> item.payment_type?.toLowerCase() === "complete")

  const columns = [
    {
      flex: 0.250,
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
      headerName: hasCompleteOrder ? 'Status/PaymentStatus' : 'Status',
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
    <Box>
      <Card>
        <CardHeader title={<Typography fontWeight={700} fontSize={22}>My Orders</Typography>} />
        <CardContent>

          <Menu
            keepMounted
            id='simple-menu'
            anchorEl={anchorEl}
            onClose={handleClose}
            open={Boolean(anchorEl)}>
            {selectedRow?.status !== "delivered" && selectedRow?.status !== "completed" &&
              selectedRow?.status !== "cancelled" && <MenuItem onClick={e => setShowConfirmationDialog(true)}>
                Cancel Order
              </MenuItem>}
          </Menu>

          <DialogConfirmation
            show={showConfirmationDialog}
            handleDialog={handleShowDialogConfirmation}
            handleConfirmation={handleCancelOrder}
          />

          <DialogConfirmation
            show={deleteDialog}
            handleDialog={handleShowDeleteDialog}
            handleConfirmation={handleDeleteOrder}
          />

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
    </Box>
  );
}

export default CustomerOrders
