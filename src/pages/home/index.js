// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import HomeSlider from "../../views/component/slider/HomeSlider";
import Image from "next/image";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {Icon} from "@iconify/react";
import {useRouter} from "next/router";

const Home = () => {
  const router = useRouter()

  return (
    <>
      <Box sx={{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap: 20
      }}>
        <Image height={500} width={500} src={'/images/home-bg.png'} />

        <Box>
          <Typography variant={'h3'}>
              Explore Your Agriculture Journey with Hamro Kheti
          </Typography>
          <Typography variant={'body1'}>
            Digitizing Agriculture, Nurturing Nature
          </Typography>
          <Button
          endIcon={
            <Icon icon={'healthicons:agriculture-outline'} />
          }
          variant={'outlined'}
          sx={{
            mt: 4
          }}
          onClick={()=> router.push('/products')}
          >
            Explore Products
          </Button>
        </Box>

      </Box>

    </>
  )
}

export default Home
