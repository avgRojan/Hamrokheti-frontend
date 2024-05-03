import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import FarmingLoader from "../../../../views/component/loading/FarmerLoader";
import {DataGrid} from "@mui/x-data-grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import {useState} from "react";
import getStatusColor from "../../../../utils/getStatusColor";
import dayjs from "dayjs";
import {useGetAllAdminQuery} from "../../../../redux/apps/profile/profileApi";
import Button from "@mui/material/Button";
import DialogCreateAdmin from "../../../../views/pages/admin/DialogCreateAdmin";

const AdminListPage = () => {
  const {data, isLoading}= useGetAllAdminQuery();
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [showCreateAdminDialog, setShowCreateAdminDialog] = useState(false)

  const columns = [
    {
      flex: 0.125,
      minWidth: 255,
      field: 'username',
      headerName: 'USERNAME',
      renderCell: params => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }}>
            <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600, fontSize: 14 }}>
                {row?.username}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.125,
      type: 'text',
      minWidth: 255,
      headerName: 'email',
      field: 'email',
      renderCell: ({ row }) => (
        <Typography variant='body2' fontSize={14} sx={{ color: 'text.primary' }}>
          {row?.email}
        </Typography>
      )
    },
    {
      flex: 0.125,
      type: 'text',
      minWidth: 120,
      headerName: 'user type',
      field: 'user_role',
      renderCell: ({ row }) => (
        <Typography variant='body2' fontSize={14} sx={{ color: 'text.primary' }}>
          {row.user_role}
        </Typography>
      )
    },
    {
      flex: 0.125,
      type: 'text',
      minWidth: 120,
      headerName: 'status',
      field: 'status',
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
      type: 'text',
      minWidth: 120,
      headerName: 'CREATED DATE',
      field: 'created_date',
      renderCell: ({ row }) => (
        <Typography variant='body2' fontSize={14} sx={{ color: 'text.primary' }}>
          {row?.date_joined ? dayjs(row?.date_joined).format('YYYY-MM-DD') : null}
        </Typography>
      )
    }
  ]

  return (
    <>
      <Card>
        <CardHeader title={<Typography variant={'h3'}>Admin List</Typography>} />
        <CardContent>
          <Box sx={{
            display:'flex',
            justifyContent: 'end',
            my:4
          }}>

            <Button variant={'contained'} onClick={()=> setShowCreateAdminDialog(true)}>Create Admin</Button>
          </Box>

          <DialogCreateAdmin
            show={showCreateAdminDialog}
            handleDialog={(isShow)=> setShowCreateAdminDialog(isShow)}
            />

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

    </>
  )
}

export default AdminListPage
