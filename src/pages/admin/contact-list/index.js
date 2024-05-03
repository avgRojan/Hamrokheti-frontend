import Box from "@mui/material/Box";
import FarmingLoader from "../../../views/component/loading/FarmerLoader";
import {DataGrid} from "@mui/x-data-grid";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import formatMoney from "../../../utils/formatMoney";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {useGetAllOrdersQuery} from "../../../redux/apps/orders/ordersApi";
import {Stack} from "@mui/system";
import getStatusColor from "../../../utils/getStatusColor";
import IconButton from "@mui/material/IconButton";
import {Icon} from "@iconify/react";
import {useGetAllContactsQuery} from "../../../redux/apps/contact/contactApi";

const ContactListPage = () => {
  const {data, isLoading} = useGetAllContactsQuery()
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

  const columns = [
    {
      flex: 0.15,
      minWidth: 220,
      field: 'full_name',
      headerName: 'FULL NAME',
      renderCell: params => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', m:0, p:0 }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600, fontSize: 16 }}>
                {
                  row?.full_name
                }
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.125,
      field: 'email',
      minWidth: 110,
      headerName: 'email',
      renderCell: ({ row }) => (
        <Stack>
          <Typography variant='body2' fontSize={14} sx={{ color: 'text.primary' }}>
            {row?.email}
          </Typography>
        </Stack>
      )
    },
    {
      flex: 0.125,
      field: 'message',
      minWidth: 110,
      headerName: 'message',
      renderCell: ({ row }) => (
        <Stack>
          <Typography variant='body2' fontWeight={500} fontSize={14} sx={{ color: 'text.primary' }}>
            {
              row?.message
            }
          </Typography>
        </Stack>
      )
    }
  ]


  return (
    <Box>
      <Card>
        <CardHeader title={<Typography variant={'h3'}>Contact List</Typography>} />
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

export default ContactListPage
