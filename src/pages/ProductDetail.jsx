import React, { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/appSlice';
import { addProductToBasket } from '../redux/basketSlice';

import { useParams } from 'react-router-dom'

import { toast } from 'react-toastify';

import productService from '../services/ProductService';

import { Button, Container } from '@mui/material';
import Box from '@mui/material/Box';





function ProductDetail() {
    const { productId } = useParams();
    // console.log(typeof productId);  //! string gelen paramsı number yapmak gerekli  fakeApi storede bu değer number
    const dispatch = useDispatch();

    //-------------------------- sepet artırmaa- azaltma işlemi

    const [count, setCount] = useState(1);

    const countDown = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    }
    const countUp = () => {
        setCount(count + 1);
    }
    //-------------------------- ürünleri tek tek çekme
    const [product, setProduct] = useState([]);
    const { id, title, price, description, category, image, rating } = product;

    const getProductById = async (productId) => {
        try {
            dispatch(setLoading(true));
            const product = await productService.getProductById(productId);
            // console.log(product);
            setProduct(product);
        } catch (error) {
            toast.error("ürün detayı getirilirken hata oluştu" + error);
        } finally {
            dispatch(setLoading(false));
        }
    }

    //-------------------------------- basketSlice kısmına göndermek için
    // if kurma nedeni yukardaki product tipime ProductType veya null dediğimiz için null işi bozmaması için

    const addBasket = () => {
        if (product) {
            const payload = {
                ...product,
                count: count    //setlediğimiz counttan geliyor
            }
            dispatch(addProductToBasket(payload))
            toast.success("ürün sepete eklendi")
        }
    }

    //--------------------------------
    useEffect(() => {
        getProductById(Number(productId));
    }, [])

    //!--------------------------------
    return (
        <Container>
            {
                product &&

                <Box sx={{ minHeight: '82vh', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'center' }}>
                    {/* //------------------------ */}
                    <Box
                        sx={{
                            width: {
                                xs: 150,    // XS ekran boyutunda genişlik 150px
                                md: 250,    // LG ekran boyutunda genişlik 250px
                            },
                            height: {
                                xs: 200,    // XS ekran boyutunda yükseklik 250px
                                md: 300,    // LG ekran boyutunda yükseklik 350px
                            },
                            // objectFit: 'cover', // Görselin düzgün bir şekilde yerleşmesini sağlamak için
                        }}
                    >
                        <img src={image} style={{ width: '100%', height: '100%' }} />
                    </Box>
                    {/* //------------------------ */}
                    <Box sx={{ marginLeft: { xs: '0px', md: '30px' }, display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' }, marginTop: { xs: '30px', md: '0px' } }}>
                        <Box sx={{ fontSize: { xs: '15px', md: '18px' }, fontWeight: 'bold', width: { xs: '250px', md: '500px' } }}>{title}</Box>
                        <Box sx={{ fontSize: { xs: '13px', md: '16px' }, textAlign: 'justify', marginTop: '25px', minHeight: '100px', width: { xs: '250px', md: '500px' } }}>{description}</Box>


                        {/* //------------------------ */}
                        <Box sx={{ marginTop: '20px' }}>
                            <Box sx={{ fontFamily: 'monospace', fontSize: { xs: '25px', md: '30px' }, fontWeight: 'bold' }}>{price} ₺</Box>

                            <Box sx={{ marginTop: '10px', display: 'flex', flexDirection: 'row' }}>
                                <Box onClick={countDown}
                                    sx={{ fontSize: { xs: '25px', md: '30px' }, fontWeight: 'bold', cursor: 'pointer', marginRight: '20px' }}>-</Box>
                                <Box sx={{ fontSize: { xs: '25px', md: '30px' }, fontFamily: 'monospace' }}>{count}</Box>
                                <Box onClick={countUp}
                                    sx={{ fontSize: { xs: '25px', md: '30px' }, fontWeight: 'bold', cursor: 'pointer', marginLeft: '20px' }}>+</Box>
                            </Box>

                            <Box>
                                <Button
                                    onClick={addBasket}
                                    variant='contained' size='small'
                                    sx={{
                                        marginTop: '10px', textTransform: 'none', bgcolor: '#ff8f00'
                                    }}
                                >
                                    Sepete Ekle
                                </Button>
                            </Box>
                        </Box>
                        {/* //------------------------ */}

                    </Box>

                </Box>
            }
        </Container >

    )
}

export default ProductDetail