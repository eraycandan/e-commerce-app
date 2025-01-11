import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { setFavoriteProducts } from '../redux/appSlice';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';



//----------------------------------------------- HOME PAGEDEN GELEN MAP VERİSİ PROPS ARACILIĞI İLE BURAYAGEÇİLİR
//----------------------------------------------- ÖNYÜZ BURDA HAZIRLANACAK
function ProductCard(product) {
    // console.log(product)
    const { id, title, price, description, category, image, rating } = product.product
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { favoriteProducts } = useSelector((state) => state.app)
    // console.log(favoriteProducts)

    // const [isFavorites, setIsFavorites] = useState(false);   //! bu şekildede olur ama favori drawer kısmında ürün kaldırınca burası güncellenmez
    const isFavorite = favoriteProducts.find((favorite) => favorite.id === id);     //? id kontrolü ile reduxa koymadan yönetildi

    const handleFavorite = (idNo) => {
        // console.log(idNo)
        // setIsFavorites(!isFavorites);  //! bu şekildede olur ama favori drawer kısmında ürün kaldırınca burası güncellenmez
        dispatch(setFavoriteProducts(idNo));
    };

    //!---------------------------------------------------
    return (
        <div>
            <Card sx={{
                cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', width: '300px', height: '600px', margin: '10px',
                borderRadius: '15px',
                boxShadow: theme => theme.palette.boxshadow.default,
                // bgcolor: '#f5f5f5',
                transition: ' 0.4s  ease-in',
                ":hover": {
                    boxShadow: theme => theme.palette.boxshadow.hover,
                }
            }}>

                <CardMedia
                    component="img"
                    image={image}
                    sx={{
                        objectFit: 'contain',
                        width: '230px',
                        height: '230px',

                        transition: ' 0.3s  ease-in',
                        ":hover": {
                            width: '240px',
                            height: '240px',
                        }
                    }}
                />

                <CardContent sx={{ height: '200px' }}>
                    <Typography gutterBottom variant='h6' component="div" sx={{ height: '90px', textAlign: 'justify' }}>
                        {title.substring(0, 40)}...
                    </Typography>
                    <Typography variant='body2' sx={{ color: 'text.secondary', height: '100px', textAlign: 'justify' }}>
                        {description.substring(0, 150)}...
                    </Typography>
                </CardContent>

                <CardContent>
                    <Typography variant='h6' sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
                        {price} ₺
                    </Typography>
                </CardContent>

                <CardActions sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div key={id}>
                        <IconButton size='small' sx={{ color: '#ef8108', marginLeft: '20px', gap: '10px' }}
                            onClick={() => handleFavorite(id)}
                        >
                            {
                                isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />
                            }
                        </IconButton>
                    </div>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Rating name="read-only" value={rating.rate} readOnly />
                        <div style={{ color: 'grey', fontWeight: 'bold', fontSize: '15px' }}>{rating.rate}</div>
                    </Box>
                    <Button size='small' variant='contained'
                        sx={{ bgcolor: '#0288d1', fontWeight: 'bold', marginRight: '20px' }}
                        onClick={() => navigate("/product-detail/" + id)}
                    >
                        DETAY</Button>
                </CardActions>
            </Card>


        </div>

    )
}

export default ProductCard