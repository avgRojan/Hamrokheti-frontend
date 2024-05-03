import {useRouter} from "next/router";
import {useCreateEsewaOrderQuery} from "../../../../redux/apps/orders/ordersApi";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
import CardHeader from "@mui/material/CardHeader";

const OrderSuccessPage = () => {
  const router = useRouter();
  const {data, isSuccess, isError} = useCreateEsewaOrderQuery(router?.query?.data)

  return (
    <>
      <Card>
        <CardContent>
          <Box sx={{
            display:'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 4,
            my:4
          }}>
            <Typography variant={'h4'} color={'primary'}>
              Your Payment is Completed Successfully. Please look at your orders by clicking the button below
            </Typography>

            <Button variant={'contained'} component={Link} href={'/orders/order-request/customer'} sx={{
              mt:4
            }}>
                View Orders
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

export default OrderSuccessPage
