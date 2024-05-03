import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {Icon} from "@iconify/react";
import {useRouter} from "next/router";
import FarmerLoader from "../../../views/component/loading/FarmerLoader";
import CardProducts from "../../../views/pages/products/CardProduct";
import {useAuth} from "../../../hooks/useAuth";
import { useGetUserProductQuery} from "../../../redux/apps/products/api";
import toast from "react-hot-toast";
import Card from "@mui/material/Card";

const MyProductPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(null);
  const auth = useAuth();

  const {data, isLoading} = useGetUserProductQuery()

  const products = data?.data
  const router = useRouter();

  // Handle search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);

    const filteredList = products?.filter((product) =>
      product?.name?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    setFilteredProducts(filteredList);
  };

  const productFinal = filteredProducts ?? products

  if(auth.user.user_role !== 'farmer'){
    toast.error('Sorry ! You are not authorized')
    router.push('/products')

    return
  }


  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            My Products
          </Typography>
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            fullWidth
            label="Search Products"
            value={searchTerm}
            onChange={handleSearch}
            InputProps={
              {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearch}>
                      <Icon icon={'mdi:tag-search-outline'} />
                    </IconButton>
                  </InputAdornment>
                )
              }
            }
          />
        </Grid>

        {isLoading ? <FarmerLoader /> : <Grid item xs={12}>
          <Grid container spacing={2} sx={{
            mt: 10
          }}>
            {productFinal?.length === 0 ?
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                  No Products Found
                </Typography>
              </Grid> :
              productFinal?.map((product) => (
                <Grid onClick={()=>router.push(`/products/edit/${product.id}`)} key={product.id} item xs={12} sm={4}>
                  <CardProducts product={product}/>
                </Grid>
            ))}
          </Grid>
        </Grid>}
      </Grid>
    </Container>
  );
};

export default MyProductPage;
