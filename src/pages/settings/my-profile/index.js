import FarmerLoader from "../../../views/component/loading/FarmerLoader";
import {useAuth} from "../../../hooks/useAuth";
import UserProfile from "../../../views/pages/settings/profile/UserProfile";
import FarmerProfile from "../../../views/pages/settings/profile/FarmerProfile";
import PartnerProfile from "../../../views/pages/settings/profile/PartnerProfile";

const MyProfilePage = () => {
  const {user} = useAuth()

  if(user?.user_role === 'normal_user'){
    return <UserProfile />
  } else if (user?.user_role === 'farmer'){
    return <FarmerProfile />
  } else if (user?.user_role === 'partner'){
    return <PartnerProfile />
  }

  return (<FarmerLoader />);
}


export default MyProfilePage
