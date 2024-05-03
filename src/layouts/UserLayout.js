import useMediaQuery from '@mui/material/useMediaQuery'

// ** Layout Imports
// !Do not remove this Layout import
import Layout from 'src/@core/layouts/Layout'

// ** Navigation Imports
import VerticalNavItems from 'src/navigation/vertical'
import VerticalFarmerNavItems from 'src/navigation/vertical/farmer'
import VerticalPartnersNavItems from 'src/navigation/vertical/partner'
import VerticalAdminNavItems from 'src/navigation/vertical/admin'
import HorizontalNavItems from 'src/navigation/horizontal'
import HorizontalFarmerNavItems from 'src/navigation/horizontal/farmer'
import HorizontalPartnersNavItems from 'src/navigation/horizontal/partner'
import HorizontalAdminNavItems from 'src/navigation/horizontal/admin'

// ** Component Import
// Uncomment the below line (according to the layout type) when using server-side menu
// import ServerSideVerticalNavItems from './components/vertical/ServerSideNavItems'
// import ServerSideHorizontalNavItems from './components/horizontal/ServerSideNavItems'

import VerticalAppBarContent from './components/vertical/AppBarContent'
import HorizontalAppBarContent from './components/horizontal/AppBarContent'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'
import {useRouter} from "next/router";
import Box from "@mui/material/Box";
import {useAuth} from "../hooks/useAuth";
import {useEffect, useState} from "react";

const AppBrand = () => {
  const router = useRouter()
  const auth = useAuth()
  const isAdmin = auth?.user?.user_role === "admin"

  return (
    <Box onClick={() => router.push(isAdmin ? '/admin' : '/home')} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
      <img
        src={`/images/hamrokheti-logo.png`}
        alt='hamrokhetilogo'
        height='80'
        width='80'
      />
    </Box>
  )
}

const UserLayout = ({ children, contentHeightFixed }) => {
  // ** Hooks
  const { settings, saveSettings } = useSettings()

  // ** Vars for server side navigation
  // const { menuItems: verticalMenuItems } = ServerSideVerticalNavItems()
  // const { menuItems: horizontalMenuItems } = ServerSideHorizontalNavItems()
  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/material-ui/react-use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))
  if (hidden && settings.layout === 'horizontal') {
    settings.layout = 'vertical'
  }

  // getting current year for footer content
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()

  const [navItems, setNavItems] = useState(null)
  const [verticalNavItems, setVerticalNavItems] = useState(null)

  const auth = useAuth();


  useEffect(() => {
    const isFarmer = auth?.user?.user_role === 'farmer'
    const isPartner = auth?.user?.user_role === 'partner'
    const isAdmin = auth?.user?.user_role === 'admin'
    const isCustomer = auth?.user?.user_role === 'normal_user'

    if(isFarmer){
      setNavItems(HorizontalFarmerNavItems())
      setVerticalNavItems(VerticalFarmerNavItems())
    } else if(isPartner){
      setNavItems( HorizontalPartnersNavItems())
      setVerticalNavItems(VerticalPartnersNavItems())
    } else if(isAdmin){
      setNavItems(HorizontalAdminNavItems())
      setVerticalNavItems(VerticalAdminNavItems())
    } else if(isCustomer) {
      setNavItems(HorizontalNavItems())
      setVerticalNavItems(VerticalNavItems())
    } else{
      return null
    }

  }, []);

  return (
    <Layout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      contentHeightFixed={contentHeightFixed}
      footerProps={{
        content: () => (
          <span>
            © {currentYear} All right reserved <strong>HAMRO KHETI</strong>
          </span>
        )
      }}
      verticalLayoutProps={{
        navMenu: {
          branding: () => <AppBrand />,
          navItems: verticalNavItems

          // Uncomment the below line when using server-side menu in vertical layout and comment the above line
          // navItems: verticalMenuItems
        },
        appBar: {
          content: props => (
            <VerticalAppBarContent
              hidden={hidden}
              settings={settings}
              saveSettings={saveSettings}
              toggleNavVisibility={props.toggleNavVisibility}
            />
          )
        }
      }}
      {...(settings.layout === 'horizontal' && {
        horizontalLayoutProps: {
          navMenu: {
            navItems: navItems
          },
          appBar: {
            content: () => <HorizontalAppBarContent settings={settings} saveSettings={saveSettings} />,
            branding: () => <AppBrand />
          }
        }
      })}
    >
      {children}

    </Layout>
  )
}

export default UserLayout
