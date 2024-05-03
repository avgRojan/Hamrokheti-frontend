import Box from "@mui/material/Box";
import {useGetProductsQuery} from "../../../redux/apps/products/api";
import FarmingLoader from "../../../views/component/loading/FarmerLoader";
import {DataGrid} from "@mui/x-data-grid";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import formatMoney from "../../../utils/formatMoney";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Image from "next/image";
import {useGetAllOrdersQuery} from "../../../redux/apps/orders/ordersApi";
import {Stack} from "@mui/system";
import getStatusColor from "../../../utils/getStatusColor";
import IconButton from "@mui/material/IconButton";
import {Icon} from "@iconify/react";

const OrdersListPage = () => {
  const {data, isLoading} = useGetAllOrdersQuery()
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

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
      headerName: 'Created By',
      renderCell: ({ row }) => (
        <Stack>
          <Typography variant='body2' fontWeight={500} fontSize={14} sx={{ color: 'text.primary' }}>
            {
              row?.ordered_by
            }
          </Typography>
          <Typography variant='body2' fontSize={12} sx={{ color: 'text.primary' }}>
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
          <IconButton  sx={{ color: 'text.primary', opacity: 0.8, fontSize: 20 }}>
            <Icon icon={'tabler:dots-vertical'} />
          </IconButton>
        </Box>
      )
    }
  ]


  return (
    <Box>
      <Card>
        <CardHeader title={<Typography variant={'h3'}>Orders List</Typography>} />
        <CardContent>
          {
            isLoading ? <FarmingLoader/> :
              <DataGrid
                autoHeight
                columns={columns}
                columnHeaderHeight={40}
                pageSizeOptions={[10, 25, 50, 100]}
                onPaginationModelChange={newModel => setPaginationModel(newModel)}
                paginationModel={paginationModel}
                getRowId={row => row?.id}
                rows={data || []}
                rowHeight={60}
                sx={{
                  '& .MuiSvgIcon-root': {
                    fontSize: '1.125rem'
                  },
                  mt: 5
                }}
                slotProps={{
                  baseButton: {
                    size: 'medium',
                    variant: 'outlined'
                  }
                }}
              />
          }
        </CardContent>
      </Card>

    </Box>
  );
}

export default OrdersListPage
