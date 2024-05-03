import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LoadingForButton = () => {
  return (
    <Box sx={{mb: 4, display:'flex', justifyContent: 'center'}}><CircularProgress  size={20} thickness={2} disableShrink={true}/></Box>
  );
}

export default LoadingForButton;
