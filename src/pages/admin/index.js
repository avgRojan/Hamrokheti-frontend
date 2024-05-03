import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CardDashboard from "../../views/pages/admin/CardDashboard";
import {useGetDashboardCountsQuery} from "../../redux/apps/dashboard/dashboardApi";
import toast from "react-hot-toast";
import {useAuth} from "../../hooks/useAuth";
import Error401 from "../401";


const AdminHomePage = () => {
  const {data, isLoading} = useGetDashboardCountsQuery()
  const {user} = useAuth()

  const dashboardData = [
    {
      title: 'Total Users',
      icon: 'mdi:users-outline',
      iconColor: 'text.pinkRaspberry',
      size: data?.total_users
    },
    {
      title: 'Total Products',
      icon: 'fluent:production-20-filled',
      iconColor: 'text.islamicGreen',
      size: data?.total_products
    },
    {
      title: 'Total Orders',
      icon: 'fluent-mdl2:activate-orders',
      iconColor: 'text.mediumPersianBlue',
      size: data?.total_orders
    },
    {
      title: 'Total Admin',
      icon: 'eos-icons:admin',
      iconColor: 'text.rustyRed',
      size: data?.total_admins
    },
    {
      title: 'Total Farmer',
      icon: 'fluent-emoji-flat:man-farmer',
      iconColor: 'text.oceanGreen',
      size: data?.total_farmers
    },
    {
      title: 'Total Partners',
      icon: 'material-symbols:partner-exchange',
      iconColor: 'text.purpleMountainMajesty',
      size: data?.total_partners
    },
    {
      title: 'Total Customers',
      icon: 'icon-park-outline:customer',
      iconColor: 'text.darkTangerine',
      size: data?.total_customers
    },
    {
      title: 'Total News',
      icon: 'game-icons:newspaper',
      iconColor: 'text.oliveGreen',
      size: data?.total_news
    },
    {
      title: 'Total Veg Market Rate',
      icon: 'icon-park-outline:market-analysis',
      iconColor: 'text.mediumElectricBlue',
      size: data?.total_veg_market
    },

  ]

  if (user?.user_role !== 'admin'){
    toast.error('You are not authorized')

    return <Error401 />
  }

  return (
      <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pt: 8, pb: 6 }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
            Welcome to Hamrokheti
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" sx={{ opacity: 0.7, display: 'flex', justifyContent: 'center' }}>
            The admin panel for managing your farm
          </Typography>
        </Box>
        <Grid container spacing={4} sx={{ alignItems: "center", mt: 10 }}>
          {dashboardData.map( (item, index)=> <Grid key={index} item xs={4}>
            <CardDashboard {...item}/>
          </Grid>)}
        </Grid>
      </Container>
  );
};

export default AdminHomePage;
