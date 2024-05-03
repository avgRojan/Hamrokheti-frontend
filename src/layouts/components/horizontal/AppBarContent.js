// ** MUI Imports
import Box from '@mui/material/Box'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import IconButton from "@mui/material/IconButton";
import {Icon} from "@iconify/react";
import Badge from "@mui/material/Badge";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {useAuth} from "../../../hooks/useAuth";
import Typography from "@mui/material/Typography";

const AppBarContent = props => {
  // ** Props
  const { settings, saveSettings } = props
  const router = useRouter();

  const {cart} = useSelector(state=> state.cart)
  const {user} = useAuth()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box>
        {user?.user_role === "normal_user" ? <Badge badgeContent={cart?.length ?? 0} color="secondary">
          <IconButton onClick={() => router.push('/products/cart')}>
            <Icon icon={'mdi:cart-check'}/>
          </IconButton>
        </Badge>
          :
        <Box sx={{
          mr: 4
        }}>
          <Typography sx={{
            textTransform: 'capitalize',
            fontWeight: 700,
            fontSize: 14
          }}>Welcome {user?.full_name ?? user?.user_role} 😊</Typography>
        </Box>
        }
      </Box>
      {/*<ModeToggler settings={settings} saveSettings={saveSettings} />*/}
      <UserDropdown settings={settings} />
    </Box>
  )
}

export default AppBarContent
