import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import {subYears} from "date-fns";
import DatePicker from 'react-datepicker'
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import toast from "react-hot-toast";
import {useEffect, useState} from "react";
import {useGetUserProfileQuery, useUpdateUserProfileMutation} from "../../../../redux/apps/profile/profileApi";
import imageValidation from "../../../../utils/imageValidation";
import getProfileBase64 from "../../../../utils/getProfileBase64";
import {ImgStyled, ResetButtonStyled} from "../../../../pages/products/add-products";
import CustomTextField from "../../../../@core/components/mui/text-field";
import DatePickerWrapper from "../../../../@core/styles/libs/react-datepicker";
import CustomInput from "../../../component/input/CustomInput";
import {useAuth} from "../../../../hooks/useAuth";
import LoadingForButton from "../../../component/loading/LoadingForButton";
import dayjs from "dayjs";

const schema = yup.object().shape({
  full_name: yup.string().trim().required("Name is required")
    .max(100, 'Maximum 100 characters allowed'),
  address: yup.string()
    .trim()
    .max(200, 'Maximum 200 characters allowed')
    .required("Address is required"),
})


const PartnerProfile = () => {

  const auth = useAuth();
  const [imgSrc, setImgSrc] = useState(`/images/avatars/1.png`)
  const [inputValue, setInputValue] = useState('')
  const {data: profileData} = useGetUserProfileQuery()

  const {control, setValue, reset, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      full_name: '',
      dob: null,
      address: '',
      gender: 'male'
    },
    resolver: yupResolver(schema)
  })

  const [updateProfile, {isLoading, isError, isSuccess, data, error}] = useUpdateUserProfileMutation()

  const onSubmit = (data) => {
    updateProfile(
      {
        ...data,
        profile_image: imgSrc,
        dob: data?.dob && dayjs(data?.dob).format('YYYY-DD-MM')
      })
  }

  const handleInputImageChange = async e => {
    const file = e.target.files[0];
    const validation = imageValidation(file);
    if (validation !== true) {
      toast.error(validation);

      return;
    }

    const base64File = await getProfileBase64(file)
    setImgSrc(base64File.base64)
  }

  const handleInputImageReset = () => {
    setInputValue('')
    setImgSrc(`/images/avatars/1.png`)
  }

  useEffect(() => {
    if(profileData && Object.keys(profileData)?.length > 0) {
      reset({
        ...profileData,
        dob: profileData?.dob ? new Date(profileData?.dob) : undefined,
      })
      setImgSrc(profileData?.profile_image)
    }
  }, [profileData]);

  useEffect(() => {
    if(isSuccess){
      toast.success(data?.message)
      reset()
    }
    if(isError){
      toast.error(error?.data?.message)
    }

  }, [isSuccess, isError]);

  const belowMd = useMediaQuery((theme)=> theme.breakpoints.down('md'))
  const mediumDevices = useMediaQuery(theme => theme.breakpoints.up('md'))
  const smallDevices = useMediaQuery(theme => theme.breakpoints.up('sm'))

  return (
    <Box>
      <Card sx={{
        mx: belowMd ? 10 : 20
      }}>
        <CardHeader title={<Typography variant={'h3'}>My Profile</Typography>} />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <ImgStyled
                src={imgSrc ?? `/images/avatars/1.png`}
                alt='product Pic'
              />
              <Box>
                <Button
                  fullWidth={mediumDevices || smallDevices ? false : true}
                  component='label'
                  variant='contained'
                  htmlFor='account-settings-upload-image'
                >
                  Upload Profile Image
                  <input
                    hidden
                    type='file'
                    value={inputValue}
                    accept='image/png, image/jpeg'
                    onChange={e => {
                      handleInputImageChange(e)
                    }}
                    id='account-settings-upload-image'
                  />
                </Button>
                <ResetButtonStyled color='secondary' variant='tonal' onClick={handleInputImageReset}>
                  Reset
                </ResetButtonStyled>
                <Typography sx={{ mt: 4, color: 'text.disabled' }}>
                  Allowed PNG or JPEG. Max size of {`${process.env.NEXT_PUBLIC_DOCUMENT_LIMIT ?? 5}`}MB.
                </Typography>
              </Box>
            </Box>

            <Divider sx={{
              my: 4
            }}/>

            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name={'full_name'}
                  render={({field})=>(
                    <CustomTextField
                      {...field}
                      fullWidth
                      error={errors?.full_name}
                      helperText={errors?.full_name?.message}
                      label={<Typography fontSize={14}>
                        FULL NAME
                      </Typography>}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name={'address'}
                  control={control}
                  render={({field})=> (
                    <CustomTextField
                      {...field}
                      fullWidth
                      error={Boolean(errors?.address)}
                      helperText={errors?.address?.message}
                      label={<Typography fontSize={14}>
                        ADDRESS
                      </Typography>}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name={'delivery_area'}
                  control={control}
                  render={({field})=> (
                    <CustomTextField
                      {...field}
                      fullWidth
                      error={Boolean(errors?.delivery_area)}
                      helperText={errors?.delivery_area?.message}
                      label={<Typography fontSize={14}>
                        Delivery Area
                      </Typography>}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name={'years_of_experience'}
                  control={control}
                  render={({field})=> (
                    <CustomTextField
                      {...field}
                      fullWidth
                      type={'number'}
                      error={Boolean(errors?.years_of_experience)}
                      helperText={errors?.years_of_experience?.message}
                      label={<Typography fontSize={14}>
                        Years of Experience
                      </Typography>}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name={'delivery_capacity'}
                  control={control}
                  render={({field})=> (
                    <CustomTextField
                      {...field}
                      fullWidth
                      type={'number'}
                      error={Boolean(errors?.delivery_capacity)}
                      helperText={errors?.delivery_capacity?.message}
                      label={<Typography fontSize={14}>
                        Delivery Capacity (in times per day)
                      </Typography>}
                      InputProps={{
                        inputProps: {
                          min: 1
                        }
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name={'working_hours'}
                  control={control}
                  render={({field})=> (
                    <CustomTextField
                      {...field}
                      fullWidth
                      error={Boolean(errors?.working_hours)}
                      helperText={errors?.working_hours?.message}
                      label={<Typography fontSize={14}>
                        Working Hours
                      </Typography>}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name={'estimated_delivery_days'}
                  control={control}
                  render={({field})=> (
                    <CustomTextField
                      {...field}
                      fullWidth
                      type={'number'}
                      error={Boolean(errors?.estimated_delivery_days)}
                      helperText={errors?.estimated_delivery_days?.message}
                      label={<Typography fontSize={14}>
                        Estimated Delivery ( in days)
                      </Typography>}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name={'delivery_charge'}
                  control={control}
                  render={({field})=> (
                    <CustomTextField
                      {...field}
                      fullWidth
                      type={'number'}
                      error={Boolean(errors?.delivery_charge)}
                      helperText={errors?.delivery_charge?.message}
                      label={<Typography fontSize={14}>
                        Delivery Charge (In Rs.)
                      </Typography>}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name={'available_for_delivery'}
                  control={control}
                  render={({field})=> (
                    <CustomTextField
                      {...field}
                      select
                      fullWidth
                      error={Boolean(errors?.available_for_delivery)}
                      helperText={errors?.available_for_delivery?.message}
                      label={<Typography fontSize={14}>
                        Available For Delivery
                      </Typography>}
                    >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name={'phone'}
                  control={control}
                  render={({field})=> (
                    <CustomTextField
                      {...field}
                      fullWidth
                      type={'number'}
                      error={Boolean(errors?.phone)}
                      helperText={errors?.phone?.message}
                      label={<Typography fontSize={14}>
                        Phone Number
                      </Typography>}
                    />
                  )}
                />
              </Grid>

            </Grid>
            <Box sx={{
              display:'flex',
              justifyContent:'end',
              mt: 4
            }}>
              {isLoading ? <LoadingForButton /> : <Button
                variant={'contained'}
                type={'submit'}
              >
                Update Profile
              </Button>}
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default PartnerProfile;
