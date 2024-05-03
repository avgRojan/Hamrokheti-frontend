import Box from "@mui/material/Box";
import {Controller, useForm} from "react-hook-form";
import Grid from "@mui/material/Grid";
import CustomTextField from "../../../../../@core/components/mui/text-field";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import {ImgStyled, ResetButtonStyled} from "../../../../products/add-products";
import imageValidation from "../../../../../utils/imageValidation";
import toast from "react-hot-toast";
import getProfileBase64 from "../../../../../utils/getProfileBase64";
import {useState} from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import ReactDraftWysiwyg from "../../../../../@core/components/react-draft-wysiwyg";
import {EditorWrapper} from "../../../../../@core/styles/libs/react-draft-wysiwyg";
import EditorState from "draft-js/lib/EditorState";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {Icon} from "@iconify/react";
import {useAddNewsMutation} from "../../../../../redux/apps/news/api";
import useToast from "../../../../../hooks/useToast";
import { stateToHTML } from "draft-js-export-html";
import LoadingForButton from "../../../../../views/component/loading/LoadingForButton";

const AddNewsByAdminPage = () => {
  const [imgSrc, setImgSrc] = useState(`/images/avatars/1.png`)
  const [addNews, {isLoading, isSuccess, data, error, isError}] = useAddNewsMutation()
  useToast({
    isError, isSuccess, data, error, redirectUrl : '/admin/admin-config/update-news'
  })

  const {
    reset,
    handleSubmit,
    control,
    formState:{errors}} = useForm({
    defaultValues: {

    }
  })

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

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
  const [inputValue, setInputValue] = useState('')

  const mediumDevices = useMediaQuery(theme => theme.breakpoints.up('md'))
  const smallDevices = useMediaQuery(theme => theme.breakpoints.up('sm'))
  const handleInputImageReset = () => {
    setInputValue('')
    setImgSrc(`/images/avatars/1.png`)
  }
  const onSubmit = (data) => {
    addNews({
      ...data,
      image: imgSrc,
      content: stateToHTML(editorState.getCurrentContent())
    })
  }


  return (
      <EditorWrapper>
      <Card>
        <CardHeader title={<Typography variant={'h5'}>Add News</Typography>} />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>

              <Grid item xs={12} md={6}>
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
                      Upload News Image
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
              </Grid>
              <Grid item xs={12} md={6}></Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name={'title'}
                  control={control}
                  render={({field}) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      width={'50%'}
                      placeholder={'News Title'}
                      label={<Typography fontWeight={500} fontSize={12}>NEWS TITLE</Typography>}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <ReactDraftWysiwyg
                  editorState={editorState}
                  onEditorStateChange={data => setEditorState(data)}
                  sx={{display: 'none'}}
                />
              </Grid>

              <Grid item xs={12} md={6} sx={{
                display:'flex',
                justifyContent:'start'
              }}>
                {isLoading ? <LoadingForButton /> : <Button
                  type={'submit'}
                  startIcon={
                    <Icon icon={'tabler:plus'}/>
                  } variant={'contained'}>
                  Add
                </Button>}
              </Grid>

            </Grid>
          </form>
        </CardContent>

      </Card>
      </EditorWrapper>
  )
}

export default AddNewsByAdminPage
