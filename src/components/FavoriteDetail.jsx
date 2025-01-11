import React from 'react'
import { removeProductFromFavoriteProducts, setFavoriteDrawer } from '../redux/appSlice';
import { useSelector, useDispatch } from 'react-redux';

import Drawer from '@mui/material/Drawer';
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';







function FavoriteDetail() {

    const { favoriteDrawer, favoriteProducts } = useSelector((state) => state.app);
    const dispatch = useDispatch();



    //-------------------------------------- drawer kapama
    const closeDrawer = () => {
        dispatch(setFavoriteDrawer(false));
    }

    //-------------------------------------- favori ürün çıkarma
    const removeProduct = (productId) => {
        dispatch(removeProductFromFavoriteProducts(productId))
    }


    //!--------------------------------------
    return (
        <Drawer open={favoriteDrawer} onClose={closeDrawer} anchor='left' sx={{ width: '400px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div>
                    <h3 style={{ fontSize: '20px', marginTop: '30px' }}>Favori Ürünler </h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                    {
                        favoriteProducts && favoriteProducts.map((product, index) => (
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: '15px 15px' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                    <div>
                                        <img style={{ marginRight: '20px' }} src={product.image} width={60} height={60} />
                                    </div>

                                    <Box sx={{ marginLeft: '10px', width: { xs: '100px', md: '350px' } }}  >
                                        <Typography sx={{ fontWeight: 'bold', fontSize: { xs: '14px', md: '16px' } }}>
                                            {product.title.substring(0, 40)}...
                                        </Typography>
                                        <Typography sx={{ marginTop: '5px', fontSize: { xs: '14px', md: '16px' } }}>
                                            {product.description.substring(0, 50)}...
                                        </Typography>
                                    </Box>
                                </div>

                                <div >
                                    <Button size='small'
                                        sx={{ textTransform: 'none', height: '25px', width: '100%', fontWeight: 'bold', color: '#ff8f00', fontSize: '15px' }}
                                        onClick={() => removeProduct(product.id)}
                                    >
                                        X
                                    </Button>
                                </div>

                            </div>

                        ))
                    }
                </div>
            </div>
        </Drawer >
    )
}

export default FavoriteDetail