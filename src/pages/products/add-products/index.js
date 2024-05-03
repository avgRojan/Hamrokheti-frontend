import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import {Controller, useForm} from "react-hook-form";
import CustomTextField from "../../../@core/components/mui/text-field";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import {useAddProductMutation} from "../../../redux/apps/products/api";
import Divider from "@mui/material/Divider";
import {styled} from "@mui/material/styles";
import {useEffect, useState} from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import imageValidation from "../../../utils/imageValidation";
import toast from "react-hot-toast";
import LoadingForButton from "../../../views/component/loading/LoadingForButton";
import {useRouter} from "next/router";
import getProfileBase64 from "../../../utils/getProfileBase64";
import {useAuth} from "../../../hooks/useAuth";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup";

export const ImgStyled = styled('img')(({ theme }) => ({
  width: 100,
  height: 100,
  marginRight: theme.spacing(6),
  borderRadius: theme.shape.borderRadius
}))

export const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(2)
  }
}))

const schema = yup.object().shape({
  name: yup.string().required('Product name is required')
    .max(100, 'Product Name cannot exceed more than 100')
  ,
  description: yup.string()
    .required('Description is required')
    .max(500, 'Description cannot exceed more than 500')
  ,
  unit_price: yup.number().required('Price is required'),
  quantity_available: yup.number().required('Available Quantity is required'),
  unit: yup.string().required('Unit is required')

})

const AddProductPage = () => {
  const {handleSubmit, control,reset,
    formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  });
  const [addProduct,{isLoading, data, error, isSuccess, isError}] = useAddProductMutation()
  const [imgSrc, setImgSrc] = useState(`/images/avatars/1.png`)
  const [inputValue, setInputValue] = useState('')
  const router = useRouter();
  const auth = useAuth();

  const onSubmit = (data) => {
    if(imgSrc === null || imgSrc === undefined || imgSrc === ''){
      toast.error('Product image is required')

      return
    }

    addProduct({...data, product_image: imgSrc})
  }

  const mediumDevices = useMediaQuery(theme => theme.breakpoints.up('md'))
  const smallDevices = useMediaQuery(theme => theme.breakpoints.up('sm'))

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

  useEffect(()=>{
    if(isSuccess){
      toast.success(data?.message)
      reset()
      router.push('/products')
    }
    if(isError){
      toast.error(error?.data?.message)
    }
  },[isSuccess, isError])

  if(auth.user.user_role !== 'farmer'){
    toast.error('Sorry ! You are not authorized')
    router.push('/products')

    return
  }

  return (
    <>
      <Card>
        <CardHeader title={
          <Typography variant={'h4'}>
            ADD PRODUCTS
          </Typography>
        }
        subheader={'Add Your Agricultural Products..'}
        />

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
                  Upload Product Image
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
                name={'name'}
                control={control}
                render={({field})=>(
                  <CustomTextField
                    {...field}
                    fullWidth
                    placeholder={'Name of your product...'}
                    error={Boolean(errors?.name)}
                    helperText={errors?.name?.message}
                    label={
                      <Typography fontSize={14} fontWeight={500}>
                        Name
                      </Typography>
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name={'unit'}
                control={control}
                render={({field})=>(
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    error={Boolean(errors?.unit)}
                    helperText={errors?.unit?.message}
                    placeholder={'Unit of your product...'}
                    label={
                      <Typography fontSize={14} fontWeight={500}>
                        Unit
                      </Typography>
                    }
                  >
                    <MenuItem value={'kg'}>KiloGram</MenuItem>
                    <MenuItem value={'g'}>Gram</MenuItem>
                    <MenuItem value={'l'}>Liter</MenuItem>
                    <MenuItem value={'ml'}>Milliliter</MenuItem>
                    <MenuItem value={'bunch'}>Bunch</MenuItem>
                    <MenuItem value={'other'}>Other</MenuItem>

                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name={'unit_price'}
                control={control}
                render={({field})=>(
                  <CustomTextField
                    {...field}
                    fullWidth
                    type={'number'}
                    error={Boolean(errors?.unit_price)}
                    helperText={errors?.unit_price?.message}
                    placeholder={'Unit price of your product...'}
                    label={
                      <Typography fontSize={14} fontWeight={500}>
                        Unit Price
                      </Typography>
                    }
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
                name={'quantity_available'}
                control={control}
                render={({field})=>(
                  <CustomTextField
                    {...field}
                    fullWidth
                    type={'number'}
                    error={Boolean(errors?.quantity_available)}
                    helperText={errors?.quantity_available?.message}
                    placeholder={'Available quantity of your product...'}
                    label={
                      <Typography fontSize={14} fontWeight={500}>
                        Available Quantity
                      </Typography>
                    }
                    InputProps={{
                      inputProps: {
                        min: 1
                      }
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name={'description'}
                control={control}
                render={({field})=>(
                  <CustomTextField
                    {...field}
                    multiline
                    rows={10}
                    fullWidth
                    error={Boolean(errors?.description)}
                    helperText={errors?.description?.message}
                    placeholder={'Description of your product...'}
                    label={
                      <Typography fontSize={14} fontWeight={500}>
                        Description
                      </Typography>
                    }
                  />
                )}
              />
            </Grid>
          </Grid>

          <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: 10
          }}>

            {isLoading ? <LoadingForButton /> : <Button type={'submit'} variant={'contained'}> Save Changes</Button>}
          </Box>

          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default AddProductPage
