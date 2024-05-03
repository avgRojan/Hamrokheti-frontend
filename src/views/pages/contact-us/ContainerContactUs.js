import React, {useEffect} from 'react';
import {makeStyles} from "@mui/styles";
import {Container} from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import {Icon} from "@iconify/react";
import * as yup from 'yup'
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useCreateContactMutation} from "../../../redux/apps/contact/contactApi";
import toast from "react-hot-toast";

const backgroundImage = '/images/contact.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    background: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    minHeight: '100vh',
    padding: 8,
  },
  buttonContainer: {
    marginBottom: 4,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 4,
    borderRadius: 2,
  },
}));

const schema = yup.object().shape({
  full_name: yup.string().required('Full Name is required')
 .max(50, 'Full Name cannot exceed more than 50')
 ,
  email: yup.string().required('Email is required')
 .max(50, 'Email cannot exceed more than 50')
 ,
  message: yup.string().required('Message is required')
 .max(255, 'Message cannot exceed more than 255')
 ,
})


const ContactUs = () => {
  const classes = useStyles();

  const {handleSubmit, reset, control, formState: {errors}} = useForm({
    defaultValues: {
      full_name: "",
      email: "",
      message: ""
    },
    resolver: yupResolver(schema)
  })

  const [createContact, {isLoading, error, isSuccess,isError, data }] = useCreateContactMutation()

  const onSubmit = (data)=>{
    createContact({
      ...data
    })
  }

  useEffect(() => {
    if(isSuccess){
      toast.success(data?.message)
      reset()
    }
    if(isError){
      toast.error(error?.data?.message)
    }

  }, [isSuccess, isError]);

  const handleEmailButtonClick = () => {
    window.location.href = 'mailto:your-email@example.com';
  };

  const handlePhoneButtonClick = () => {
    window.location.href = 'tel:+1234567890';
  };

  return (
    <Container className={classes.root}>
      <Container>
        <Grid container spacing={2} justify="center" className={classes.buttonContainer}>
          <Grid item>
            <IconButton sx={{
              color:'primary',
              backgroundColor: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)'
              }
            }} color="primary" onClick={handleEmailButtonClick}>
              <Icon icon={'streamline:ai-email-generator-spark'} />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton sx={{
              color: 'secondary',
              backgroundColor: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)'
              }
            }} variant="contained" color="secondary" onClick={handlePhoneButtonClick}>
              <Icon icon={'line-md:phone-call-loop'} />
            </IconButton>
          </Grid>
        </Grid>
        <Container className={classes.formContainer}>
          <Typography variant="h4" gutterBottom>
            Contact Us
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name={'full_name'}
                  control={control}
                  render={({field})=>(
                    <TextField
                      {...field}
                      fullWidth
                      label="Your Name"
                      variant="outlined"
                      error={Boolean(errors?.full_name)}
                      helperText={errors?.full_name?.message}
                    />
                  )}
                  />

              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name={'email'}
                  render={({field})=>(
                    <TextField
                      {...field}
                      fullWidth
                      label="Your Email"
                      variant="outlined"
                      type="email"
                      error={Boolean(errors?.email)}
                      helperText={errors?.email?.message}
                    />
                  )}
                  />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name={'message'}
                  control={control}
                  render={({field})=>(
                    <TextField
                      {...field}
                      fullWidth
                      label="Message"
                      variant="outlined"
                      multiline
                      rows={4}
                      error={Boolean(errors?.message)}
                      helperText={errors?.message?.message}
                    />
                  )}
                  />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Container>
    </Container>
  );
};

export default ContactUs;
