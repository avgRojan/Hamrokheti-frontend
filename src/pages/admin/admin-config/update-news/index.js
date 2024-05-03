import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import FarmingLoader from "../../../../views/component/loading/FarmerLoader";
import {DataGrid} from "@mui/x-data-grid";
import Card from "@mui/material/Card";
import {
  useDeleteNewsMutation,
  useGetNewsQuery,
  useGetVegetableMarketQuery,
  useScrapeNewsMutation
} from "../../../../redux/apps/news/api";
import {useState} from "react";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import {Icon} from "@iconify/react";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import DialogConfirmation from "../../../../views/component/dialog/DialogConfirmation";
import useToast from "../../../../hooks/useToast";
import {useRouter} from "next/router";

const UpdateNewsPage = () => {
  const { data, isLoading, isError } = useGetNewsQuery();
  const [updateNews, {isLoading: isUpdateNewsLoading}] = useScrapeNewsMutation()
  const [deleteNews, {isLoading: isDeleteLoading,isSuccess: isSuccessDelete, isError: isErrorDelete, error: errorDelete, data: errorData}] = useDeleteNewsMutation()
  const [selectedRow, setSelectedRow] = useState(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const router = useRouter()

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [searchQuery, setSearchQuery] = useState("");

  useToast({
    isSuccess:isSuccessDelete,
    isError:isErrorDelete,
    error:errorDelete,
    data: errorData,
    handleDialog: (show)=>setShowDeleteDialog(show)
  })

  const handleDeleteNews = () => {
    deleteNews(selectedRow?.id)
  }

  const columns = [
    {
      flex: 0.2,
      minWidth: 255,
      field: 'title',
      headerName: 'title',
      renderCell: params => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Image src={row?.image} alt={row?.title} height={40} width={40}/>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600, fontSize: 14 }}>
                {row?.title}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      type: 'text',
      minWidth: 125,
      headerName: 'source',
      field: 'source',
      renderCell: ({ row }) => (
        <Typography variant='body2' fontSize={14} sx={{ color: 'text.primary' }}>
          {row?.source}
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
          {row?.created_at ? dayjs(row?.created_at).format('YYYY-MM-DD') : null}
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
          <IconButton
            onClick={()=> setShowDeleteDialog(true)}
            sx={{
            color: 'red'
          }}> <Icon icon={'ep:delete'} /></IconButton>
          {
            row?.source === 'admin' &&
            <IconButton
              onClick={()=> router.push(`/admin/admin-config/update-news/edit/${row?.id}`)}
              sx={{
                color: 'grey'
              }}> <Icon icon={'ep:edit'} /></IconButton>
          }
        </Box>
      )
    }
  ]

  const filteredData = data ? data?.filter(item =>
    item?.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const handleCellClick = ({row, field}) => {
    if(field === "title" && row.source !== "admin"){
      window.open(row?.link, "_blank");
    } else if(field === "title" && row.source === "admin") {
      router.push(`/news/${row?.id}`)
    }
    setSelectedRow(row)
  }

  const handleUpdateNewsClick= () => {
    updateNews()
  }

  return (
    <Card>
      <CardHeader
        title={<Typography variant={'h5'}> Daily News</Typography>}
      />
      <DialogConfirmation
        show={showDeleteDialog}
        handleDialog={(show)=> setShowDeleteDialog(show)}
        handleConfirmation={handleDeleteNews}
        title={'Are you sure you want to delete this news ?'}
        isLoading={isDeleteLoading}
      />
      <Box sx={{
        display: 'flex',
        justifyContent:'space-between',
        alignItems: 'center'
      }}>
        <TextField
          label="Search By News Name"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ margin: '10px', width: '30%' }}
        />
        <Box sx={{
          display:'flex',
          gap: 4
        }}>
          <Button
            endIcon={<Icon icon="simple-icons:scrapbox" />}
            variant={'outlined'}
            onClick={handleUpdateNewsClick}
            >
            Update News From Online
          </Button>
          <Button
            endIcon={<Icon icon="tabler:plus" />}
            variant={'contained'}
            onClick={()=> router.push('/admin/admin-config/update-news/add')}
            sx={{
              mr: 4,
            }}>
            Add News
          </Button>
        </Box>

      </Box>
      <Divider />
      {
        (isLoading || isUpdateNewsLoading) ? <FarmingLoader/> :
          <DataGrid
            autoHeight
            columns={columns}
            columnHeaderHeight={40}
            pageSizeOptions={[10, 25, 50, 100]}
            onPaginationModelChange={newModel => setPaginationModel(newModel)}
            paginationModel={paginationModel}
            getRowId={row => row?.id}
            onCellClick={handleCellClick}
            rows={filteredData || []}
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
    </Card>
  );
}

export default UpdateNewsPage;
