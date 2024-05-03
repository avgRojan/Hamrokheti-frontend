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
  dob: yup.string().trim().required('Date of Birth is required'),
  address: yup.string()
    .trim()
    .max(200, 'Maximum 200 characters allowed')
    .required("Address is required"),
  phone: yup.string()
    .trim()
    .min(7, 'Phone number must be at least 10 characters')
    .max(15, 'Phone Number cannot exceed more than 15 characters')
    .required('This field is required')
})


const FarmerProfile = () => {

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
        dob: data?.dob && dayjs(new Date(data?.dob)).format('YYYY-DD-MM')
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
        dob: profileData?.dob ? new Date(profileData?.dob) : undefined
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
                <DatePickerWrapper>
                  <Controller
                    name='dob'
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        showYearDropdown
                        showMonthDropdown
                        scrollableYearDropdown={true}
                        yearDropdownItemNumber={100}
                        maxDate={subYears(new Date(), 14)}
                        dateFormat={'yyyy-MM-dd'}
                        error={Boolean(errors.dob)}
                        {...(errors.dob && { helperText: errors.dob.message })}
                        selected={field.value}
                        onChange={date => setValue('dob', date)}
                        placeholderText='YYYY-MM-DD'
                        customInput={<CustomInput
                          fullWidth
                          label={
                            <Typography fontSize={14}>
                              DATE OF BIRTH
                            </Typography>
                          }
                        />}
                      />
                    )}
                  />
                </DatePickerWrapper>

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
                  name={'phone'}
                  control={control}
                  render={({field})=> (
                    <CustomTextField
                      {...field}
                      fullWidth
                      error={Boolean(errors?.phone)}
                      helperText={errors?.phone?.message}
                      label={<Typography fontSize={14}>
                        PHONE
                      </Typography>}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name={'gender'}
                  control={control}
                  render={({field})=>(
                    <CustomTextField
                      {...field}
                      fullWidth
                      select
                      error={Boolean(errors.gender)}
                      helperText={errors?.gender?.message}
                      label={
                        <Typography fontSize={14}>
                          GENDER
                        </Typography>
                      }
                    >
                      <MenuItem value={'male'}>Male</MenuItem>
                      <MenuItem value={'female'}>Female</MenuItem>
                      <MenuItem value={'other'}>Others</MenuItem>

                    </CustomTextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name={'farm_name'}
                  control={control}
                  render={({field})=> (
                    <CustomTextField
                      {...field}
                      fullWidth
                      error={Boolean(errors?.farm_name)}
                      helperText={errors?.farm_name?.message}
                      label={<Typography fontSize={14}>
                        Farm Name
                      </Typography>}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name={'farm_location'}
                  control={control}
                  render={({field})=> (
                    <CustomTextField
                      {...field}
                      fullWidth
                      error={Boolean(errors?.farm_location)}
                      helperText={errors?.farm_location?.message}
                      label={<Typography fontSize={14}>
                        Farm Location
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
                        Year of Experience
                      </Typography>}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name={'farm_size_acres'}
                  control={control}
                  render={({field})=> (
                    <CustomTextField
                      {...field}
                      fullWidth
                      type={'number'}
                      error={Boolean(errors?.years_of_experience)}
                      helperText={errors?.years_of_experience?.message}
                      label={<Typography fontSize={14}>
                        Farm Size (in acres)
                      </Typography>}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name={'primary_crop'}
                  control={control}
                  render={({field})=> (
                    <CustomTextField
                      {...field}
                      fullWidth
                      error={Boolean(errors?.primary_crop)}
                      helperText={errors?.primary_crop?.message}
                      label={<Typography fontSize={14}>
                        Primary Crop
                      </Typography>}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name={'livestock_count'}
                  control={control}
                  render={({field})=> (
                    <CustomTextField
                      {...field}
                      fullWidth
                      type={'number'}
                      error={Boolean(errors?.livestock_count)}
                      helperText={errors?.livestock_count?.message}
                      label={<Typography fontSize={14}>
                        Livestock Count
                      </Typography>}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name={'organic_certification'}
                  control={control}
                  render={({field})=> (
                    <CustomTextField
                      {...field}
                      select
                      fullWidth
                      error={Boolean(errors?.organic_certification)}
                      helperText={errors?.organic_certification?.message}
                      label={<Typography fontSize={14}>
                        Organic Certification ?
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
                  name={'farm_description'}
                  control={control}
                  render={({field})=> (
                    <CustomTextField
                      {...field}
                      fullWidth
                      error={Boolean(errors?.farm_description)}
                      helperText={errors?.farm_description?.message}
                      label={<Typography fontSize={14}>
                        Farm Description
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

export default FarmerProfile;
