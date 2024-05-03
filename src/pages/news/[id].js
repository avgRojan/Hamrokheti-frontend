import {useGetSingleNewsQuery} from "../../redux/apps/news/api";
import {useRouter} from "next/router";

import { makeStyles } from '@mui/styles';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import Box from "@mui/material/Box";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    marginBottom: 2,
  },
  cardDetails: {
    flex: 1,
  },
  cardContent: {
    padding: 10,
  },
  cardMedia: {
    width: 500,
  },
  title: {
    marginBottom: 1.5,
    fontWeight: 700
  },
}));

const NewsDetailsPage = () => {
  const router = useRouter()
  const {data: newsData} = useGetSingleNewsQuery(router?.query?.id)
  const classes = useStyles();


  return (
    <Box>
      <Box sx={{
        mb: 4,
        display:'flex',
        gap: 4
      }}>
        <Typography fontSize={16} component={Link} href={'/news'} sx={{
          textDecoration: 'none',
          color: 'grey',
          '&:hover': {
            textDecoration: 'underline',
          }
        }
        }>News</Typography>
        <Typography fontSize={16}>/</Typography>
        <Typography fontSize={16}>News Details</Typography>

      </Box>
      <Card className={classes.card}>
        {newsData?.image && (
          <CardMedia
            className={classes.cardMedia}
            image={newsData?.image}
            title="News Image"
            fullWidth
          />
        )}
        <CardContent>
          <div className={classes.cardDetails}>
            <CardContent className={classes.cardContent}>
              <Typography component="h2" variant="h2" className={classes.title}>
                {newsData?.title}
              </Typography>
              <Typography variant="body2" dangerouslySetInnerHTML={{ __html: newsData?.content }} />
              <Typography variant="subtitle2" color="textSecondary" sx={{
                display: 'flex',
                alignItems: 'start',
                justifyContent:'start',
                mt: 10
              }}>
                Source: {newsData?.source} - Published: {newsData?.date}
              </Typography>
            </CardContent>
          </div>
        </CardContent>

      </Card>
    </Box>
  );
}


export default NewsDetailsPage;
