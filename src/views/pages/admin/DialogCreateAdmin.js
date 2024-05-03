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
import {CustomCloseButton} from "../../component/buttons/CustomCloseButton";
import Grid from "@mui/material/Grid";
import {Controller, useForm} from "react-hook-form";
import {useCreateAdminMutation} from "../../../redux/apps/profile/profileApi";
import CustomTextField from "../../../@core/components/mui/text-field";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import useToast from "../../../hooks/useToast";
import Button from "@mui/material/Button";
import LoadingForButton from "../../component/loading/LoadingForButton";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup";


const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})


const schema = yup.object().shape({
  username: yup.string().required('Username is required.').matches(/^\w+$/, 'Username must be alphanumeric.'),
  email: yup.string().required('Email is required.').email('Invalid email format.'),
  password: yup.string().required('Password is required.')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+={}\[\]|\\:;"'<>?,./~-]).{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.')
});

const DialogCreateAdmin = ({ show, handleDialog, row }) =>{

  const [createAdmin, {isLoading, data, error, isError, isSuccess}] = useCreateAdminMutation()
  const [showPassword, setShowPassword] = useState(false)

  const {
    reset,
    control,
    handleSubmit,
    formState: {errors}} = useForm({
    defaultValues: {},
    resolver: yupResolver(schema)
  })
  useToast({isSuccess, isError, data, error, reset, handleDialog})

  const handleCreateAdmin= (data) => {
    createAdmin({
      ...data
    })
  }

  return (
    <Box>
      <Dialog
        fullWidth
        open={show}
        maxWidth='sm'
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
            <CardHeader
              title={<Typography fontSize={18} fontWeight={500}>Create Another Admin</Typography>}
              subheader={'New Admin can have every access you have'}
            />
            <CardContent>
              <form  onSubmit={handleSubmit(handleCreateAdmin)}>
            <Grid container spacing={6}>
            <Grid item xs={12} md={12}>
              <Controller
                name={'username'}
                control={control}
                render={({field})=>(
                  <CustomTextField
                    fullWidth
                    {...field}
                    label={<Typography fontSize={12} fontWeight={500}>USERNAME</Typography>}
                    placeholder={'johndoe'}
                    error={Boolean(errors?.username)}
                    helperText={errors?.username?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Controller
                name={'email'}
                control={control}
                render={({field})=>(
                  <CustomTextField
                    fullWidth
                    {...field}
                    type={'email'}
                    label={<Typography fontSize={12} fontWeight={500}>EMAIL</Typography>}
                    placeholder={'johndoe@example.com'}
                    error={Boolean(errors?.email)}
                    helperText={errors?.email?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Controller
                name={'password'}
                control={control}
                render={({field})=>(
                  <CustomTextField
                    {...field}
                    fullWidth
                    label={<Typography fontSize={12} fontWeight={500}>PASSWORD</Typography>}
                    id='auth-login-v2-password'
                    type={showPassword ? 'text' : 'password'}
                    error={Boolean(errors?.password)}
                    helperText={errors?.password?.message}
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
            </Grid>
              <Grid item xs={12} md={12}>
                {isLoading ? <LoadingForButton />: <Button type={'submit'} fullWidth variant={'contained'}>Save Changes</Button>}
              </Grid>
          </Grid>
              </form>
            </CardContent>
          </Card>

        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default DialogCreateAdmin;
