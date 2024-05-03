import React from 'react';
import {makeStyles} from "@mui/styles";
import {Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  title: {
    marginBottom: 1,
    fontWeight: 700
  },
  subtitle: {
    marginBottom: 4,
    fontSize: 16
  },
  paragraph: {
    marginBottom: 2,
    fontSize: 20,
    textAlign: 'justify'
  },
}));

const ContainerAboutUs = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant="h2" className={classes.title} align="center">
        About Us
      </Typography>
      <Typography variant="subtitle1" className={classes.subtitle} align="center">
        Bridging the Gap Between Farmers and Customers
      </Typography>
      <Divider sx={{
        my: 10
      }}/>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" className={classes.paragraph}>
            HamroKheti is a revolutionary agriculture project aimed at eliminating the gap between farmers and consumers.
            Our mission is to empower farmers by providing them with a platform to directly connect with customers,
            thereby ensuring fair prices for their produce and reducing dependency on middlemen.
          </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            With HamroKheti, farmers can showcase their products, share information about their farming practices,
            and interact with customers in real-time. On the other hand, customers gain access to fresh,
            locally sourced produce while supporting sustainable farming practices.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" className={classes.paragraph}>
            Our platform utilizes cutting-edge technology to create a seamless experience for both farmers and customers.
            Through features such as real-time messaging, online ordering, and transparent pricing,
            we aim to revolutionize the way agricultural products are bought and sold.
          </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            At HamroKheti, we are committed to fostering a sense of community and collaboration within the agricultural sector.
            By facilitating direct communication and transactions, we empower farmers to take control of their livelihoods
            while ensuring consumers have access to high-quality, nutritious produce.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContainerAboutUs;
