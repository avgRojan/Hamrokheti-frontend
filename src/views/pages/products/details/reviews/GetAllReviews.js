import Box from "@mui/material/Box";
import { useGetAllReviewQuery} from "../../../../../redux/apps/products/api";
import {useRouter} from "next/router";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import dayjs from "dayjs";

const GetAllReviews = () => {
  const router = useRouter()
  const {data} = useGetAllReviewQuery({product:router?.query?.id})

  return (
    <Card>
      <CardHeader title={<Typography variant={'h4'}>All Reviews</Typography>} />
      <CardContent>
          {data?.length > 0 ? data?.map((item) =>
            <Box key={item?.id} sx={{
              display:'flex',
              gap: 4,
              justifyContent: 'start',
              flexDirection: 'column'
            }}>
                  <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}>
                <Rating
                  value={item?.rating_value}
                  readOnly
                />
                <Typography>{item?.user}</Typography>
                </Box>
              <Box>
                <Typography
                  fontSize={12}
                  fontWeight={500}>
                  {dayjs(item.created_at).format('YYYY-MM-DD hh:mm:ss A') }
                </Typography>
                <Typography>{item?.review}</Typography>
              </Box>
              <Divider sx={{
                mb: 4
              }}/>
            </Box>
          )
          : <Box><Typography variant={'h5'}> No reviews yet</Typography></Box>
          }
      </CardContent>

    </Card>

  )
}

export default GetAllReviews
