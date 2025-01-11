import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { filterProducts, setChangeDarkMode, setCurrentLoginUser, setDrawer, setFavoriteDrawer, setProducts } from '../redux/appSlice';
import { toast } from 'react-toastify';
import ProductService from '../services/ProductService';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HomeIcon from '@mui/icons-material/Home';


function Navbar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { favoriteProducts, currentUser, darkMode } = useSelector((state) => state.app)
    const { basket } = useSelector((state) => state.basket)



    // ------------------------- LOGIN LOGOUT alt  sekmeler
    const [anchorEl, setAnchorEl] = useState(null);

    //!  hangi buton altında açılmasını istiyorsan o butonun html etiketini  vermen lazım. currentTarget ile yakaladık
    const openMenu = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const closeMenu = () => {
        setAnchorEl(null);
    }

    const openControl = anchorEl ? true : false;

    // -------------------------------------- STORAGE  İŞLEM
    const logout = () => {
        localStorage.removeItem("currentLoginUser");
        dispatch(setCurrentLoginUser(null));
        navigate("/login");
        toast.success("çıkış yapıldı");
    }
    // -------------------------------------- FİLTER
    const handleFilter = async (e) => {
        e.preventDefault();
        try {
            // console.log(e.target.value)
            if (e.target.value) {
                //filtreleme yapmak istiyor
                dispatch(filterProducts(e.target.value));
            } else {
                //ekranda bütün ürünleri gösterelim. sildiğimiz zaman yoksa ürünler geri gelmiyor
                const products = await ProductService.getAllProducts();
                dispatch(setProducts(products));
            }
        } catch (error) {
            toast.error("filtrelemede hata oluştu" + error)
        }
    }

    // -------------------------------------- BASKET DETAİL OPEN

    const openDrawer = () => {
        dispatch(setDrawer(true));
    }

    const openFavoriteDrawer = () => {
        dispatch(setFavoriteDrawer(true));
    }

    // -------------------------------------- KARANLIK - AYDINLIK MOD
    const changeTheme = () => {
        dispatch(setChangeDarkMode());
    }

    //! -------------------------------------------------------------------------
    return (

        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <AppBar position='static'
                sx={{
                    display: 'flex', justifyContent: 'center', width: '100%', height: '80px',
                    backgroundColor: theme => theme.palette.appbar.default,
                }}>
                {/* -----backgroundColor: 'appbar.default'  da kabul oluyor ----- */}
                <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>



                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconButton
                            onClick={changeTheme}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 1 }}
                        >
                            {
                                darkMode
                                    ? <WbSunnyIcon sx={{ fontSize: { xs: '25px', md: '35px' } }} />
                                    : <DarkModeIcon sx={{ fontSize: { xs: '25px', md: '35px' } }} />
                            }
                        </IconButton>
                        {/* // --------------------------  anasayfa yönlendirme  */}

                        {/* XS için HomeIcon */}
                        <Box onClick={() => navigate("/")}
                            sx={{ display: { xs: 'block', sm: 'none' }, cursor: 'pointer' }}>
                            <HomeIcon sx={{ fontSize: '25px', marginRight: '10px' }} />
                        </Box>

                        <Typography
                            onClick={() => navigate("/")}
                            variant="h6"
                            component="div"
                            sx={{
                                display: { xs: 'none', sm: 'block' }, fontSize: { sm: '18px', md: '25px', lg: '30px' }, cursor: 'pointer', fontFamily: 'Gluten'
                            }}
                        >
                            e - commerce
                        </Typography>
                    </Box>

                    {/* // --------------------------  FİLTRE  */}


                    <TextField      //! MUI den alındı
                        onChange={(e) => handleFilter(e)}
                        sx={{
                            width: { xs: '35%', sm: '25%' },
                            transition: '0.3s ease-in',
                            ":hover": {
                                width: { xs: 'none', md: '35%' },
                            }
                        }}
                        id="searchInput"
                        placeholder="ürün ara..."
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: '#fff' }} />
                                    </InputAdornment>
                                ),
                                style: {
                                    color: '#fff',
                                    borderBottom: '2px solid #fff',
                                    // backgroundColor: 'rgba(82, 165, 255, 0.7)',
                                    borderRadius: '5px',

                                }
                            },
                        }}
                        variant="standard"
                    />

                    {/* // -------------------------- FAVORİ - SEPET */}

                    <Box sx={{ display: 'flex', marginRight: '10px', gap: { xs: 0, lg: 5 } }}>
                        <IconButton
                            onClick={openFavoriteDrawer}
                            size="large"
                            aria-label="favorites"
                            color="inherit"
                        >
                            <Badge badgeContent={favoriteProducts.length} color="warning">
                                <FavoriteBorderIcon sx={{ fontSize: { xs: '25px', md: '35px' } }} />
                            </Badge>
                        </IconButton>



                        <IconButton
                            onClick={openDrawer}
                            size="large"
                            aria-label="show basket"
                            color="inherit"
                        >
                            <Badge
                                badgeContent={basket.length} color="warning">
                                <LocalGroceryStoreIcon sx={{ fontSize: { xs: '25px', md: '35px' } }} />
                            </Badge>

                            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '12px' }}>
                                    <span style={{ fontSize: '14px' }}>alışveriş</span>
                                    <span style={{ fontSize: '21px' }}>sepeti</span>
                                </div>
                            </Box>
                        </IconButton>

                        {/* // -------------------------- LOGIN LOGUT  */}

                        <IconButton
                            size="large"
                            // edge="end"
                            // aria-label="account of current user"
                            // aria-controls={menuId}
                            // aria-haspopup="true"
                            // onClick={handleProfileMenuOpen}
                            color="inherit"
                            onClick={openMenu}
                        // sx={{ marginRight: '10px' }}
                        >
                            {
                                currentUser.username
                                    ? <Avatar size='small' sx={{
                                        bgcolor: "#fff", fontWeight: 'bold', color: 'black',
                                        width: { xs: '20px', md: '30px' }, height: { xs: '20px', md: '30px' }
                                    }}>{currentUser.username[0]}</Avatar>
                                    : <AccountCircle />
                            }
                            {
                                currentUser.username &&

                                <Box sx={{ marginLeft: '10px', display: { xs: 'none', sm: 'block' } }}>
                                    <Typography sx={{ fontSize: { xs: '12px', md: '16px' } }}>hoşgeldin</Typography>
                                    <Typography sx={{ fontSize: { xs: '16px', md: '22px' } }}>{currentUser.username}</Typography>
                                </Box>
                            }
                        </IconButton>
                        {/* // ------------------------ */}
                        <Menu
                            anchorEl={anchorEl}
                            open={openControl}
                            onClose={closeMenu}
                        >
                            <MenuItem sx={{ gap: 1, fontSize: { xs: '12px', md: '15px' } }} onClick={() => navigate("/login")}>
                                <PersonAddAlt1Icon />
                                Giriş Yap / Üye Ol
                            </MenuItem>

                            <MenuItem sx={{ gap: 1, fontSize: { xs: '12px', md: '15px' } }} onClick={logout}>
                                <LogoutIcon />
                                Çıkış Yap
                            </MenuItem>
                        </Menu>
                        {/* // -------- */}
                    </Box>

                    {/* // --------------------------  */}

                </Toolbar>
            </AppBar>


        </Box>


    )
}

export default Navbar