import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import formatMoney from "../../../../utils/formatMoney";
import IconButton from "@mui/material/IconButton";
import {Icon} from "@iconify/react";
import Button from "@mui/material/Button";
import {useAuth} from "../../../../hooks/useAuth";
import {addToCart} from "../../../../redux/apps/cart";
import toast from "react-hot-toast";
import {useState} from "react";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {useGetSingleProductQuery} from "../../../../redux/apps/products/api";
import Rating from "@mui/material/Rating";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";

const ProductDetails = ({product}) => {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const {id} = router.query;
  const dispatch = useDispatch()
  const {user}= useAuth()

  const handleAddToCart = () => {
    const postData = {
      product_id: id,
      quantity: quantity ?? 0,
      price: product?.unit_price ?? 0,
      image: product?.image,
      category: product?.category,
      name: product?.name,
      status: product?.status,
      user: product?.user
    }

    dispatch(addToCart(postData))
    toast.success('Product is now added to cart')
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12}>
      <Box>
        <Typography variant="h4">{product?.name}</Typography>
        <Typography variant="body2">
          <strong>Category: </strong> {product?.category}
        </Typography>
        <Divider />
        <Box>
          <Rating
            sx={{
              fontSize: 14,
              mt: 4
            }}
            readOnly
            value={product?.average_rating}
            />
          <Typography color={'primary'} variant="h3" fontWeight={700}>
            Rs: {formatMoney(product?.unit_price) }
          </Typography>
          <Typography sx={{
            mt: 2
          }} variant="body1">
            <strong>Available Quantity: </strong> {product?.quantity_available}
          </Typography>
          <Typography sx={{
            mt: 2
          }} variant="body1"><strong>Unit:</strong> {product?.unit}</Typography>
          {product?.location && (
            <Typography sx={{
              mt: 2
            }} variant="body1"><strong>Location: </strong> {product?.location}</Typography>
          )}
          <Typography sx={{
            mt: 2
          }} variant="body1">
           <strong> Organic:</strong> {product?.is_organic ? "Yes" : "No"}
          </Typography>
          {product?.harvest_date && (
            <Typography sx={{
              mt: 2
            }} variant="body1"><strong>Harvest Date: </strong> {product?.harvest_date}</Typography>
          )}
          {product?.expiry_date && (
            <Typography sx={{
              mt: 2
            }} variant="body1"><strong>Expiry Date: </strong> {product?.expiry_date}</Typography>
          )}
          <Typography sx={{
            mt: 2
          }} variant="body1"><strong>Status:</strong> {product?.status}</Typography>

          <Typography sx={{
            mt: 2
          }} variant="body1">{product?.description}</Typography>

          <Divider sx={{
            my: 4
          }}/>

          {/*farmer details*/}
          <Box>
            <Typography variant={'h6'} fontWeight={500} sx={{
              mb: 2
            }}><strong>Farmer Details</strong> </Typography>
            <Box>
              <Box sx={{
                mb:2
              }}>
                <Avatar height={20} width={20} src={product?.farmer_profile} />
              </Box>
              <Typography sx={{
                mb: 2
              }} variant="body1">
                <strong>Name:</strong> {product?.farmer_name}
              </Typography>
              <Typography sx={{
                mb: 2
              }} variant="body1">
                <strong>Email:</strong> {product?.farmer_email}
              </Typography>
              <Typography sx={{
                mb: 2
              }} variant="body1">
                <strong>Phone:</strong> {product?.farmer_phone}
              </Typography>
              <Typography sx={{
                mb: 2
              }} variant="body1">
                <strong>Address:</strong> {product?.farmer_address}
              </Typography>

            </Box>
          </Box>
          <Divider
            sx={{
              my: 10
            }}
          />

          <Typography sx={
            {
              mb: 4
            }
          } variant="body1"><strong>Your Total Price for this product:</strong>  {
            'Rs.' + formatMoney(product?.unit_price * quantity)
          }</Typography>
          { user?.user_role === "normal_user" && <Box sx={{
            display: 'flex',
            gap: 6,
            alignItems: 'center'
          }}>
            <IconButton
              disabled={quantity <= 0}
              sx={{
                backgroundColor: 'black',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'white',
                  color: 'black'
                }
              }} onClick={() => setQuantity((prev) => prev - 1)}>
              <Icon icon={'mdi:minus'}/>
            </IconButton>
            <Typography fontSize={14} fontWeight={500}>{quantity} </Typography>
            <IconButton
              disabled={quantity >= Number(product?.quantity_available)}
              sx={{
                backgroundColor: 'black',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'white',
                  color: 'black'
                }
              }} variant={'tonal'} onClick={() => setQuantity(prev => prev + 1)}>
              <Icon icon={'mdi:plus'}/>
            </IconButton>
          </Box>
          }
          {user?.user_role === "normal_user" && <Button sx={{
            mt: 6
          }}
            variant="contained"
            color="primary"
            startIcon={<Icon icon={'system-uicons:cart'}/>}
            onClick={handleAddToCart}
            disabled={quantity <= 0}
          >
            Add To Cart
          </Button>}
        </Box>

      </Box>
    </Grid>
    </Grid>

  );
}

export default ProductDetails;
