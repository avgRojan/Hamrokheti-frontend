import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {useRouter} from "next/router";
import {useCheckUserReviewQuery, useGetSingleProductQuery} from "../../redux/apps/products/api";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import {Icon} from "@iconify/react";
import toast from "react-hot-toast";
import IconButton from "@mui/material/IconButton";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {addToCart} from "../../redux/apps/cart";
import formatMoney from "../../utils/formatMoney";
import {useAuth} from "../../hooks/useAuth";
import {TabContext, TabPanel} from "@mui/lab";
import {CustomTabList} from "../../views/component/tab/CustomTabList";
import {Tab} from "@mui/material";
import ProductDetails from "../../views/pages/products/details/ProductDetails";
import CustomTextField from "../../@core/components/mui/text-field";
import AddReviews from "../../views/pages/products/details/reviews/AddReviews";
import GetAllReviews from "../../views/pages/products/details/reviews/GetAllReviews";
import CreateComment from "../../views/pages/products/details/reviews/CreateComment";
import GetAllComments from "../../views/pages/products/details/reviews/GetAllComments";


const ProductEditPage = () => {
  const router = useRouter()
  const {data: product} = useGetSingleProductQuery(router?.query?.id)
  const {data: checkReviewData} = useCheckUserReviewQuery(router?.query?.id)
  const [tabValue, setTabValue] = useState('overview')

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }


  return (
    <>
      <Box>
        <Box sx={{
          display:'flex',
          justifyContent: 'start',
          gap: 10
        }}>
          <Box>
            <img
              height={500}
              width={500}
              src={product?.image}
            />
          </Box>
          <Box sx={{
            // backgroundColor: 'red',
            width: '100%'
          }}>
            <TabContext value={tabValue}>
              <CustomTabList onChange={handleTabChange}>
                <Tab value='overview' label='Overview' iconPosition={'start'} icon={<Icon icon={'material-symbols:overview'}/>}/>
                <Tab value='reviews' label='Reviews' iconPosition={'start'} icon={<Icon icon={'carbon:review'}/>}/>
                <Tab value='comments' label='Comments' iconPosition={'start'} icon={<Icon icon={'material-symbols:comment'}/>}/>
              </CustomTabList>
              <TabPanel value='overview' sx={{
                p: 0,mt:4
              }}>
                <ProductDetails product={product}/>
              </TabPanel>
              <TabPanel value='reviews' sx={{
                p: 0,mt:4
              }}>
                    {checkReviewData?.to_review && <><AddReviews/>
                    <Divider sx={{
                      my: 4
                    }}/>
                    </>
                    }
                    <Box>
                      <GetAllReviews />
                    </Box>
              </TabPanel>
              <TabPanel value='comments' sx={{
                p: 0,mt:4
              }}>
                <Box>
                  <CreateComment />
                </Box>

                <Divider sx={{
                  my:4
                }} />

                <Box>
                  <GetAllComments />
                </Box>
              </TabPanel>
            </TabContext>
          </Box>

        </Box>
      </Box>
    </>
  );
}

export default ProductEditPage;
