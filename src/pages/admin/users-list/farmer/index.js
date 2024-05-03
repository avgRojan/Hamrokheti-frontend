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
import {useChangeFarmerStatusMutation, useGetAllFarmersQuery} from "../../../../redux/apps/profile/profileApi";
import useToast from "../../../../hooks/useToast";
import DialogConfirmation from "../../../../views/component/dialog/DialogConfirmation";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import {Icon} from "@iconify/react";

const FarmerListPage = () => {
  const {data}= useGetAllFarmersQuery();
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [showLockUserDialog, setShowLockUserDialog] = useState(false)
  const [showUnlockUserDialog, setShowUnlockUserDialog] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [changeStatus, {isLoading, isSuccess, error, isError, data: statusData}] = useChangeFarmerStatusMutation()

  useToast({
    isSuccess, isError, data: statusData, handleDialog: (show)=> {
      setShowUnlockUserDialog(show)
      setShowLockUserDialog(show)
    }, error
  })

  const handleLockUser = () => {
    changeStatus({
      id: selectedRow?.id,
      status: "locked"
    })
  }

  const handleUnlockUser = () => {
    changeStatus({
      id: selectedRow?.id,
      status: "active"
    })
  }

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
    },
    {
      flex: 0.125,
      type: 'text',
      minWidth: 120,
      headerName: 'ACTION',
      field: 'action',
      renderCell: ({ row }) => (
        <Box>
          {row?.status !== "locked" && <Tooltip title={'Lock User'}>
            <IconButton
              onClick={()=> setShowLockUserDialog(true)}
              sx={{
                color: 'red'
              }}>
              <Icon
                icon={'material-symbols:lock-outline'}
              />
            </IconButton>
          </Tooltip>}
          {row?.status === "locked" && <Tooltip title={'Unlock User'}>
            <IconButton
              onClick={()=> setShowUnlockUserDialog(true)}
              sx={{
                color: 'green'
              }}>
              <Icon
                icon={'clarity:unlock-line'}
              />
            </IconButton>
          </Tooltip> }
        </Box>
      )
    }
  ]

  return (
    <>
      <Card>
        <CardHeader title={<Typography variant={'h3'}>Farmer List</Typography>} />
        <DialogConfirmation
          show={showLockUserDialog}
          handleDialog={(show)=>setShowLockUserDialog(show)}
          handleConfirmation={handleLockUser}
          title={'Are you sure you want to lock this user?'}
          isLoading={isLoading}

        />
        <DialogConfirmation
          show={showUnlockUserDialog}
          handleDialog={(show)=>setShowUnlockUserDialog(show)}
          handleConfirmation={handleUnlockUser}
          title={'Are you sure you want to unlock this user?'}
          isLoading={isLoading}
        />
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
                onCellClick={({row})=> setSelectedRow(row)}
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

export default FarmerListPage
