
import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Badge } from '@mui/material';
import Box from "@mui/material/Box";
import formatMoney from "../../../utils/formatMoney";
import {useAuth} from "../../../hooks/useAuth";
import IconButton from "@mui/material/IconButton";
import {Icon} from "@iconify/react";
import {useRouter} from "next/router";

const CardProducts = ({ product }) => {
  const {user} = useAuth()
  const router = useRouter()

  return (
    <Card sx={{ maxWidth: 345, maxHeight: 300, position:'relative' }}>
      <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={product.image}
            alt={product.name}
          />

        <CardContent>
          <Box sx={{
            position: 'relative'
          }}>
            <Badge sx={{
              position: 'absolute',
              top: 0,
              right:0
            }} badgeContent={product?.category} color="primary" variant="contained">
            </Badge>
          </Box>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography gutterBottom sx={{
            fontSize: 20,
            fontWeight: 700,
            color: 'green'
          }}>
            Rs. {formatMoney(product?.unit_price)}
          </Typography>
          <Box sx={{
            display:'flex',
            justifyContent: 'end'
          }}>
          </Box>

        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardProducts;
