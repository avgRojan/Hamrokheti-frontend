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
  phone: yup.string().trim()
    .required('Phone Number is required')
    .max(15, 'Maximum 15 charaters allowed')
    .min(7, 'Minimum 7 character allowed')
})


const UserProfile = () => {

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
        dob: data?.dob ? dayjs(data?.dob).format('YYYY-MM-DD') : undefined
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
    }
    setImgSrc(profileData?.profile_image)
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
        mx: belowMd ? 10 : 100
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
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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

              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
                        PHONE NUMBER
                      </Typography>}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
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

              <Grid item xs={12}>
                {isLoading ? <LoadingForButton /> : <Button
                  variant={'contained'}
                  fullWidth
                  type={'submit'}
                >
                  Update Profile
                </Button>}
              </Grid>

            </Grid>

          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UserProfile;
