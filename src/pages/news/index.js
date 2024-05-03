import {useGetNewsQuery} from "../../redux/apps/news/api";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import {CardMedia} from "@mui/material";
import Image from "next/image";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {useRouter} from "next/router";
import Divider from "@mui/material/Divider";
import dayjs from "dayjs";
import FarmerLoader from "../../views/component/loading/FarmerLoader";
import Box from "@mui/material/Box";
import removeUnderScore from "../../utils/removeUnderScore";

const NewsPage= () => {
  const { data, isLoading, isError } = useGetNewsQuery(null);
  const router = useRouter();

  const handleNewsClick = (news) => {
    if(news?.source  !== "admin"){
      window.open(news?.link, "_blank");
    } else {
      router.push(`/news/${news?.id}`)
    }
  }

  return (
    <>
      <Paper sx={{
        mx: 20,
        p: 4
      }}>
        <Typography variant={'h3'} fontWeight={700}>TODAY'S NEWS</Typography>
        <Typography variant={'body2'}>
          {data && data[0]?.created_at && dayjs(data[0]?.created_at).format('YYYY-MM-DD')}
        </Typography>
        <Divider sx={{
          mb: 4
        }}/>
        <Grid container spacing={6}>
          {
            isLoading ?<Grid item xs={12}> <Card> <CardContent><FarmerLoader /></CardContent></Card> </Grid> :
            data?.map(news => <Grid key={news?.id} item xs={4} onClick={() => handleNewsClick(news)} sx={{
            cursor: 'pointer'
          }}>
            <Card sx={{
              maxHeight: 400
            }}>
              <CardMedia sx={{
                position: 'relative'
              }}>
                <Image src={news?.image} height={200} width={500} style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  width: '100%',
                }}/>
                <Box
                  sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4, backgroundColor:'#0d519b',
                    padding: 1,
                    borderRadius: 2,
                    '&:hover': {
                      opacity: 0.8
                    }

                }}
                >
                  <Typography fontSize={10} color={'#fff'}>{removeUnderScore(news?.source)} </Typography>
                </Box>
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {news?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" >
                  {
                    (news?.content?.length > 100 && news?.source === "admin") ?
                      news?.content?.replace(/<[^>]+>/g, '')?.toString().slice(0,100) + "..." :
                      (news?.content?.length > 100 && news?.source !== "admin") ? news?.content?.slice(0,100) + "..." : news?.content
                  }
                </Typography>
              </CardContent>
            </Card>
          </Grid>)}
        </Grid>
      </Paper>

    </>
  )
}

export default NewsPage
