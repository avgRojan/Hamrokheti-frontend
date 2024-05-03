import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CustomTextField from "../../../../../@core/components/mui/text-field";
import * as yup from "yup"
import {Controller, useForm} from "react-hook-form";
import Button from "@mui/material/Button";
import {yupResolver} from "@hookform/resolvers/yup";
import {useGiveReplyMutation, usePostCommentMutation} from "../../../../../redux/apps/products/api";
import useToast from "../../../../../hooks/useToast";
import LoadingForButton from "../../../../component/loading/LoadingForButton";
import {useRouter} from "next/router";

const schema = yup.object().shape({
  text: yup.string().trim().required('This field is required')
})


const CreateCommentReplies = ({comment}) => {

  const {handleSubmit, reset, control, formState: {errors}} = useForm({
    defaultValues: {
      text: ''
    },
    resolver: yupResolver(schema)
  })

  const [giveReply, {isLoading, error, data, isSuccess, isError}]= useGiveReplyMutation()
  useToast({isError, isSuccess, data, reset, error})

  const handleCreateComment = data => {
    giveReply({
      ...data,
      comment
    })
  }

  return (
    <form onSubmit={handleSubmit(handleCreateComment)}>
      <Box>
        <Card>
          <CardHeader title={<Typography variant={'h6'}>Reply This Comment</Typography>} />
          <CardContent>

            <Controller
              name={'text'}
              control={control}
              render={({field})=>(
                <CustomTextField
                  {...field}
                  fullWidth
                  multiline
                  rows={4}
                  placeholder={'Give your reply...'}
                  error={!!errors?.text}
                  helperText={errors?.text?.message}
                />
              )}
            />

            <Box sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mt: 4
            }}>
              {isLoading ? <LoadingForButton /> : <Button
                type={'submit'}
                variant={'outlined'}>
                Reply
              </Button>}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </form>
  )
}

export default CreateCommentReplies;
