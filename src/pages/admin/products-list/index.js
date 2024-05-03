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

const ProductsListPage = () => {
  const {data, isLoading} = useGetProductsQuery()
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

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
            <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <Image src={row.image} alt={row.name} height={30} width={30} />
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
      headerName: 'sold by',
      field: 'sold_by',
      renderCell: ({ row }) => (
        <Typography variant='body2' fontSize={14} sx={{ color: 'text.primary' }}>
          {row?.user}
        </Typography>
      )
    },
    {
      flex: 0.125,
      type: 'text',
      minWidth: 120,
      headerName: 'unit',
      field: 'unit',
      renderCell: ({ row }) => (
        <Typography variant='body2' fontSize={14} sx={{ color: 'text.primary' }}>
          {row.unit}
        </Typography>
      )
    },
    {
      flex: 0.125,
      type: 'text',
      minWidth: 120,
      headerName: 'price per unit',
      field: 'unit_price',
      renderCell: ({ row }) => (
        <Typography variant='body2' fontSize={14} sx={{ color: 'text.primary' }}>
          Rs. {formatMoney(row.unit_price) ?? 0}
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

  return (
    <Box>
      <Card>
        <CardHeader title={<Typography variant={'h3'}>Products List</Typography>} />
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

export default ProductsListPage
