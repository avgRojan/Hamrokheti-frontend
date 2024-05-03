// ** React Imports
import {useEffect, useState} from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import {Controller, useForm} from "react-hook-form";
import {useCreateUserMutation} from "../../redux/apps/users/userApi";
import LoadingForButton from "../../views/component/loading/LoadingForButton";
import toast from "react-hot-toast";
import {useRouter} from "next/router";
import MenuItem from "@mui/material/MenuItem";

// ** Styled Components
const RegisterIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 600,
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(1.75),
  '& .MuiFormControlLabel-label': {
    color: theme.palette.text.secondary
  }
}))

const Register = () => {
  // ** States
  const [showPassword, setShowPassword] = useState(false)
  const [addUser, {error, isLoading, isSuccess, isError, status, data}] = useCreateUserMutation()
  const router = useRouter();

  // ** Hooks
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const {handleSubmit, control, reset, formState: {errors}} = useForm({
    defaultValues: {

    }
  })

  useEffect(() => {
    if(data?.status === "SUCCESS"){
      toast.success(data?.message)
      router.push('/login')
    } else if(data?.status === "FAILURE"){
      toast.error(data?.message)
    }

  }, [data?.status, data?.message]);


  useEffect(() => {
    if(error){
      toast.error(error?.data?.message)
    }
  }, [error]);

  const onSubmit = (data) => {
    addUser({
      ...data
    })
  }

  return (
    <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            borderRadius: '20px',
            justifyContent: 'center',
            backgroundColor: 'customColors.bodyBg',
            margin: theme => theme.spacing(8, 0, 8, 8)
          }}
        >
          <RegisterIllustration
            alt='register-illustration'
            src={`/images/register-bg.png`}
          />
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Box sx={{ my: 6 }}>
              <img src={'/images/hamrokheti-logo.png'} style={{height: 100, width: 100}}/>
              <Typography variant='h3' sx={{ mb: 1.5 }}>
                HamroKheti
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Best Agricultural World!</Typography>
            </Box>

            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name={'username'}
                control={control}
                render={({field})=>(
                  <CustomTextField
                    {...field}
                    autoFocus
                    fullWidth
                    sx={{ mb: 4 }}
                    label='Username'
                    placeholder='johndoe'
                  />
                )}
                />
              <Controller
                name={'email'}
                control={control}
                render={({field})=>(
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Email'
                    sx={{ mb: 4 }}
                    placeholder='user@email.com'
                  />
                )}
              />
              <Controller
                name={'user_role'}
                control={control}
                render={({field})=>(
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label='Type'
                    sx={{ mb: 4 }}
                    placeholder='user@email.com'
                  >
                    <MenuItem value='normal_user'>
                      Customer
                    </MenuItem>
                    <MenuItem value='farmer'>
                      Farmer
                    </MenuItem>
                    <MenuItem value='partner'>
                      Partner
                    </MenuItem>
                  </CustomTextField>
                )}
              />
              <Controller
                name={'password'}
                control={control}
                render={({field})=>(
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Password'
                    id='auth-login-v2-password'
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
                />

              <FormControlLabel
                control={<Checkbox />}
                sx={{ mb: 4, mt: 1.5, '& .MuiFormControlLabel-label': { fontSize: theme.typography.body2.fontSize } }}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Typography sx={{ color: 'text.secondary' }}>I agree to</Typography>
                    <Typography component={LinkStyled} href='/' onClick={e => e.preventDefault()} sx={{ ml: 1 }}>
                      privacy policy & terms
                    </Typography>
                  </Box>
                }
              />
               {isLoading ? <LoadingForButton />  :
                 <Button fullWidth type='submit' variant='contained' sx={{mb: 4}}>
                    Sign up
                 </Button>
               }
            </form>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}
Register.getLayout = page => <BlankLayout>{page}</BlankLayout>
Register.guestGuard = true

export default Register
