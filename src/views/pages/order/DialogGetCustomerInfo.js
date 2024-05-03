import Box from "@mui/material/Box";
import {Dialog, DialogContent, Tab} from "@mui/material";
import {Icon} from "@iconify/react";
import {forwardRef, useEffect, useState} from "react";
import Fade from "@mui/material/Fade";
import toast, {Toaster} from "react-hot-toast";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {CustomCloseButton} from "../../component/buttons/CustomCloseButton";
import {useGetCustomerInfoByOrderIdQuery, useGetPartnerInfoByOrderIdQuery} from "../../../redux/apps/orders/ordersApi";
import Image from "next/image";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";


const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})


const DialogGetCustomerInfo = ({ show, handleDialog, row }) =>{
  const [tabValue, setTabValue] = useState('basic')

  const { isLoading, isError, error, data}= useGetCustomerInfoByOrderIdQuery(row?.id)

  const handleChange = (event, newValue) => {
    setTabValue(newValue)
  }


  return (
    <Box>
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={() => handleDialog(true)}
        TransitionComponent={Transition}
        onBackdropClick={() => handleDialog(false)}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <CustomCloseButton onClick={() => handleDialog(false)}>
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>
          <Toaster
            position="top-right"
            reverseOrder={false}
          />
          <Card>
            <CardHeader title={<Typography variant={'h3'}>Customer's Information</Typography>} />
            <CardContent>
              <Box sx={{mt: 10}}>
                <TabContext value={tabValue}>
                  <TabList onChange={handleChange} aria-label='nav tabs example'>
                    <Tab value='basic' component='a' label='Basic Information' href='/basic-info' onClick={e => e.preventDefault()} />
                    <Tab value='contact' component='a' label='Contact Information' href='/contact-info' onClick={e => e.preventDefault()} />
                  </TabList>
                  <TabPanel value='basic'>
                    <Box sx={{
                      display: 'flex',
                      justifyContent:'center'
                    }}>
                      <Image src={data?.profile_image} alt={'Profile image'} height={100} width={100} />
                    </Box>
                    <Divider sx={{
                      my: 4
                    }}/>
                    <Grid container spacing={4}>
                      <Grid item xs={12} md={6}>
                        <Box sx={{
                          display:'flex',
                          gap: 4
                        }}>
                          <Typography fontSize={16} fontWeight={500}>
                            Full Name:
                          </Typography>
                          <Typography fontSize={16}>
                            {data?.full_name}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Box sx={{
                          display:'flex',
                          gap: 4
                        }}>
                          <Typography fontSize={16} fontWeight={500}>
                            Address:
                          </Typography>
                          <Typography fontSize={16}>
                            {data?.address}
                          </Typography>
                        </Box>
                      </Grid>

                    </Grid>

                  </TabPanel>
                  <TabPanel value='contact'>
                    <Box sx={{
                      display: 'flex',
                      justifyContent:'center'
                    }}>
                      <Image src={data?.profile_image} alt={'Profile image'} height={100} width={100} />
                    </Box>
                    <Divider sx={{
                      my: 4
                    }}/>
                    <Grid container spacing={6}>
                      <Grid item xs={12} md={6}>
                        <Box sx={{
                          display:'flex',
                          gap: 4
                        }}>
                          <Typography fontSize={16} fontWeight={500}>
                            Username:
                          </Typography>
                          <Typography fontSize={16}>
                            {data?.username}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Box sx={{
                          display:'flex',
                          gap: 4
                        }}>
                          <Typography fontSize={16} fontWeight={500}>
                            Email:
                          </Typography>
                          <Typography fontSize={16}>
                            {data?.email}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Box sx={{
                          display:'flex',
                          gap: 4
                        }}>
                          <Typography fontSize={16} fontWeight={500}>
                            Phone Number:
                          </Typography>
                          <Typography fontSize={16}>
                            {data?.phone}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Box sx={{
                          display:'flex',
                          gap: 4
                        }}>
                          <Typography fontSize={16} fontWeight={500}>
                            Address:
                          </Typography>
                          <Typography fontSize={16}>
                            {data?.address}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                  </TabPanel>
                </TabContext>
              </Box>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default DialogGetCustomerInfo;
