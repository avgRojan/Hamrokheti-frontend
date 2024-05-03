import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import FarmingLoader from "../../../../views/component/loading/FarmerLoader";
import {DataGrid} from "@mui/x-data-grid";
import Card from "@mui/material/Card";
import {useGetVegetableMarketQuery, useScrapeVegetableMarketMutation} from "../../../../redux/apps/news/api";
import {useState} from "react";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import {Icon} from "@iconify/react";

const UpdateVegMarketPage = () => {
  const { data, isLoading, isError } = useGetVegetableMarketQuery(null);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [searchQuery, setSearchQuery] = useState("");

  const [updateMarket, {isLoading: updateClickLoading}] = useScrapeVegetableMarketMutation()

  const columns = [
    {
      flex: 0.2,
      minWidth: 255,
      field: 'name',
      headerName: 'NAME',
      renderCell: params => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600, fontSize: 14 }}>
                {row?.name}
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
      headerName: 'MAX PRICE',
      field: 'max_price',
      renderCell: ({ row }) => (
        <Typography variant='body2' fontSize={14} sx={{ color: 'text.primary' }}>
          Rs. {row?.max_price ?? 0}
        </Typography>
      )
    },
    {
      flex: 0.125,
      type: 'text',
      minWidth: 120,
      headerName: 'MIN PRICE',
      field: 'min_price',
      renderCell: ({ row }) => (
        <Typography variant='body2' fontSize={14} sx={{ color: 'text.primary' }}>
          Rs. {row?.min_price ?? 0}
        </Typography>
      )
    },
    {
      flex: 0.125,
      type: 'text',
      minWidth: 120,
      headerName: 'AVERAGE PRICE',
      field: 'average_price',
      renderCell: ({ row }) => (
        <Typography variant='body2' fontSize={14} sx={{ color: 'text.primary' }}>
          Rs. {row?.average_price ?? 0}
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
    }
  ]

  const filteredData = data ? data?.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const handleUpdateMarketClick = () => {
    updateMarket()
  }

  return (
    <Card>
      <CardHeader
        title={<Typography variant={'h5'}> Daily Vegetable Market Rates</Typography>}
        subheader={
          <Typography variant={'body2'}>
            Source: ktm2day.com
          </Typography>
        }
      />
      <Box sx={{
        display: 'flex',
        justifyContent:'space-between',
        alignItems: 'center'
      }}>
        <TextField
          label="Search By Product Name"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ margin: '10px', width: '30%' }}
        />
        <Button
          endIcon={<Icon icon="simple-icons:scrapbox" />}
          variant={'outlined'}
          onClick={handleUpdateMarketClick}
          sx={{
          mr: 4,
        }}>
          Update Market
        </Button>
      </Box>
      <Divider />
      {
        (isLoading || updateClickLoading) ? <FarmingLoader/> :
          <DataGrid
            autoHeight
            columns={columns}
            columnHeaderHeight={40}
            pageSizeOptions={[10, 25, 50, 100]}
            onPaginationModelChange={newModel => setPaginationModel(newModel)}
            paginationModel={paginationModel}
            getRowId={row => row?.id}
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

export default UpdateVegMarketPage;
