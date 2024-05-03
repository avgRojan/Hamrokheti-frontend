import Typography from "@mui/material/Typography";
import CustomTextField from "../../../../../@core/components/mui/text-field";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import {Controller, useForm} from "react-hook-form";
import {useAddReviewMutation} from "../../../../../redux/apps/products/api";
import useToast from "../../../../../hooks/useToast";
import LoadingForButton from "../../../../component/loading/LoadingForButton";
import {useRouter} from "next/router";

const AddReviews = () => {

  const {control, reset, handleSubmit, formState:{errors}} = useForm({
    defaultValues: {
      rating: 0,
      review: ''
    }
  })

  const router= useRouter()

  const [addReview, {isLoading, isSuccess, data, error, isError}] = useAddReviewMutation()
  useToast({isSuccess, data, error, reset, isError})

  const handleAddReview = data => {
    addReview({
      ...data,
      product: router?.query?.id
    })
  }

  return (
    <form onSubmit={handleSubmit(handleAddReview)}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'start',
        flexDirection: 'column',
        gap: 4
      }}>
        <Typography
          variant='h6'
        >
          Rate and Review this Product
        </Typography>
        <Controller
          name={'rating_value'}
          control={control}
          render={({field}) => (
            <Rating
              {...field}
              name="simple-controlled"
            />
          )}
        />

        <Controller
          name={'review'}
          control={control}
          render={({field}) => (
            <CustomTextField
              {...field}
              fullWidth
              placeholder={'Please write your review'}
              multiline={true}
              rows={6}
              sx={{
                width: '100%'
              }}
            />
          )}
        />

        {isLoading ? <LoadingForButton /> : <Button type={'submit'} variant={'outlined'}>Give Review</Button>}
</Box>
    </form>

  )
}

export default AddReviews
