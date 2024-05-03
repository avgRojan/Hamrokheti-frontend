import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {Icon} from "@iconify/react";
import Typography from "@mui/material/Typography";

const CardDashboard = ({icon, iconColor, title, size}) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{
          display:'flex', flexDirection:'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <IconButton
            sx={{
              size: 20,
              color: iconColor
            }}
          >
            <Icon
              icon={icon}
            />
          </IconButton>

          <Typography
            fontWeight={700}
            fontSize={20}
          >
            {title}
          </Typography>
          <Typography
            fontWeight={700}
            fontSize={30}
            color="text.secondary"
          >
            {size}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default CardDashboard;
