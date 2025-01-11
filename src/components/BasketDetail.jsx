import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { setDrawer, updateBalance } from '../redux/appSlice';
import { calculateBasket, removeProductFromBasket, setBasket } from '../redux/basketSlice';

import { toast } from 'react-toastify';

import Drawer from '@mui/material/Drawer';
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';




function BasketDetail() {
    const { drawer, currentUser } = useSelector((state) => state.app);
    const { basket, totalAmount } = useSelector((state) => state.basket);

    const dispatch = useDispatch();

    //-------------------------------------- sayfa açıldığında hesaplamayı yap
    useEffect(() => {
        dispatch(calculateBasket());
    }, [basket])

    //-------------------------------------- drawer kapama
    const closeDrawer = () => {
        dispatch(setDrawer(false));
    }
    //-------------------------------------- ürün çıkarma
    const removeProduct = (productId) => {
        dispatch(removeProductFromBasket(productId))
    }
    //-------------------------------------- satın al
    const buy = () => {
        if (!currentUser.username) {
            toast.warn("lütfen giriş yapınız")
        }
        if (currentUser?.balance && currentUser.balance < totalAmount) {
            let needAmount = totalAmount - currentUser.balance
            toast.warn(`bakiyeniz yeterli değildir ${needAmount.toFixed(2)} ₺ para eksik kalmaktadır`)
            return;
        }
        if (currentUser?.balance && currentUser.balance >= totalAmount) {
            const remaininTotal = currentUser.balance - totalAmount;
            const payload = {
                ...currentUser, //! obj distructing ile açılabilir
                balance: remaininTotal
            }
            dispatch(updateBalance(payload));
            dispatch(setBasket([]));
            localStorage.removeItem("basket");
            toast.success("ürünler satın alınmıştır");
        }
    }
    //!--------------------------------------
    return (
        <Drawer open={drawer} onClose={closeDrawer} anchor='right' sx={{ width: '400px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div >
                    <h3 style={{ fontSize: '20px', marginTop: '30px' }}>Alışveriş Sepeti</h3>
                </div>
                {/* //------------------------ */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                    {
                        basket && basket.map((product, index) => (
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', padding: '20px 30px' }}>
                                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}>
                                    <img style={{ marginRight: '20px' }} src={product.image} width={60} height={60} />

                                    <Box sx={{ width: { xs: '100px', md: '300px' }, marginTop: { xs: '10px', md: '0px' } }}>
                                        <Typography sx={{ fontWeight: 'bold', textAlign: 'justify', fontSize: { xs: '12px', md: '15px' } }}>
                                            {product.title.substring(0, 40)}...
                                        </Typography>
                                        <Typography sx={{ marginTop: '5px', textAlign: 'justify', fontSize: { xs: '12px', md: '15px' } }}>
                                            {product.description.substring(0, 40)}...
                                        </Typography>
                                    </Box>
                                </Box>




                                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 0, md: 3 }, marginLeft: { xs: '30px' } }}>
                                    <Box >{product.count} adet</Box>
                                    <Box sx={{ fontFamily: 'monospace', fontSize: '15px', fontWeight: 'bold', width: '90px' }}>{product.price} ₺</Box>
                                </Box>

                                <Box>
                                    <Button size='small' variant='contained'
                                        sx={{ textTransform: 'none', height: '25px', bgcolor: '#01579b' }}
                                        onClick={() => removeProduct(product.id)}
                                    >
                                        Sil
                                    </Button>
                                </Box>
                            </Box>
                        ))
                    }
                </div>
                {/* //------------------------ */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ color: '#ef8108', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '18px' }}>
                        Toplam Tutar : {totalAmount} ₺
                    </div>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button onClick={buy}
                            size='small' variant='contained'
                            sx={{ textTransform: 'none', height: '25px', marginTop: '20px', bgcolor: '#8bc34a' }}
                        >
                            Satın Al
                        </Button>

                        <Button onClick={closeDrawer}
                            size='small' variant='outlined'
                            sx={{ textTransform: 'none', height: '25px', marginTop: '20px' }}
                        >
                            Sepetten Çık
                        </Button>
                    </Box>
                </div>
            </div >
        </Drawer>
    )
}

export default BasketDetail