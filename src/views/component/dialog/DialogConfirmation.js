import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import {Icon} from "@iconify/react";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import LoadingForButton from "../loading/LoadingForButton";

const DialogConfirmation = ({show, handleDialog, handleConfirmation, title, subtitle, isLoading=false}) => {

  return (
    <Dialog
      fullWidth
      open={show}
      onClose={()=>handleDialog(false)}
      sx={{
        '& .MuiPaper-root': {
          width: '100%',
          maxWidth: 380
        } }}>
      <DialogContent
        sx={{
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <Box
          sx={{
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            '& svg': { mb: 8, color: 'warning.main' }
          }}
        >
          <Icon icon='tabler:alert-circle' fontSize='5rem' />
          <Typography variant='h5' sx={{ mb: 5, fontWeight:600 }}>
            {title ?? 'Are you sure to perform this action ?'}
          </Typography>
          <Typography>
            {subtitle ?? `You won't be able to revert this action!`}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <Button variant='tonal' color='secondary' onClick={() => handleDialog(false)}>
          Cancel
        </Button>
        {isLoading ? <Box sx={{
          mr:6
        }}>
          <LoadingForButton />
        </Box>  : <Button variant='contained' sx={{mr: 3}} onClick={handleConfirmation}>
          Proceed
        </Button>}
      </DialogActions>
    </Dialog>
  );
}

export default DialogConfirmation;
