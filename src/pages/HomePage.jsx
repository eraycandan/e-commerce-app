import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { setCurrentLoginUser, setLoading, setProducts } from '../redux/appSlice';

import productService from '../services/ProductService';

import Category from '../components/Category';
import ProductCard from '../components/ProductCard';

import { toast } from 'react-toastify';

import { Container } from '@mui/material';
import Box from '@mui/material/Box';



function HomePage() {

    const dispatch = useDispatch();
    const { products, favoriteProducts } = useSelector((state) => state.app)


    //----------------------------------------------- ÜRÜNLERİ ÇAĞIRMA
    // ProductServiceden  fakeapi ürünlerini çekip redux slice kısma basmak

    const getAllProducts = async () => {
        try {
            dispatch(setLoading(true));
            const response = await productService.getAllProducts();
            if (response) {
                // console.log(response);
                dispatch(setProducts(response));
            }
        } catch (error) {
            toast.error("ürünler getirilirken hata oluştu !!!" + error)
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [])

    //----------------------------------------------- LOCAL STORAGE
    // sayfa açılınca localden userları çekip redux slice kısmına basmak

    useEffect(() => {
        const result = localStorage.getItem("currentLoginUser")
        if (result) {
            const currentUser = JSON.parse(result);
            dispatch(setCurrentLoginUser(currentUser))
        }
    }, [])

    //!-----------------------------------------------
    return (
        <Box
            sx={{
                marginBottom: '20px',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'flex-start',
                justifyContent: 'center',
                marginTop: '30px'
            }}>
            <Category />
            <Container maxWidth="xl">
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {
                        products && products.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))
                    }
                </div>
            </Container>
        </Box>
    )
}

export default HomePage