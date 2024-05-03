import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {Icon} from "@iconify/react";
import {useGetProductsQuery} from "../../redux/apps/products/api";
import CardProducts from "../../views/pages/products/CardProduct";
import FarmerLoader from "../../views/component/loading/FarmerLoader";
import {useRouter} from "next/router";

const ProductComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(null);
  const {data, isLoading}  = useGetProductsQuery();
  const router = useRouter();


  // Handle search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);

    const filteredList = products?.filter((product) =>
      product?.name?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    setFilteredProducts(filteredList);
  };

  const productFinal = filteredProducts ?? data


  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Products
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
                <Typography variant="h6" gutterBottom>
                  No Products Found
                </Typography>
              </Grid>
              :
              productFinal?.map((product) => (
              <Grid onClick={()=>router.push(`/products/${product.id}`)} key={product.id} item xs={12} sm={4}>
                  <CardProducts product={product}/>
              </Grid>
            ))}
          </Grid>
        </Grid>}
      </Grid>
    </Container>
  );
};

export default ProductComponent;
