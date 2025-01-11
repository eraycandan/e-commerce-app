import React, { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'
import { setLoading, setProducts } from '../redux/appSlice';
import { toast } from 'react-toastify';
import categoryService from '../services/CategoryService';
import productService from '../services/ProductService';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import MoreVertIcon from '@mui/icons-material/MoreVert';





function Category() {

    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);

    //! CategoryServiceden çektiğimiz kategori datasını çağırıyoruz. alttaki html taglarına mapliyoruz
    // cagegoryServiceden  getAllCategories çağırıyoruz useState kısmına setliyoruz
    // tüm kategori listesini çekip ekranın soluna basar

    const getAllCategories = async () => {
        try {
            dispatch(setLoading(true));
            const categories = await categoryService.getAllCategories();
            // console.log(categories.data);
            setCategories(categories.data);
        } catch (error) {
            toast.error("kategori alınırken hata oluştu" + error);
        } finally {
            dispatch(setLoading(false));
        }
    }
    //------------------------------------------- checkboxa göre filtreleme
    const handleCategory = async (e, categoryName) => {
        // console.log(e, categoryName)
        try {
            dispatch(setLoading(true));
            // console.log(e.target.checked)    //! true false döner
            if (e.target.checked) {
                //kategoriye göre ürünleri getir
                const products = await categoryService.getProductsByCategoryName(categoryName);
                // console.log(products);
                dispatch(setProducts(products));
            } else {  //! tüm ürünleri çekip dispatch ile setliyoruz
                // ekranda bütün ürünleri listele
                const products = await productService.getAllProducts();
                dispatch(setProducts(products));
            }
        } catch (error) {
            toast.error("kategori alınırken hata oluştu" + error)
        } finally {
            dispatch(setLoading(false));
        }
    }

    //------------------------------------------- manuel translate
    const translateToTurkish = (text) => {
        const translations = {
            "electronics": "elektronik",
            "jewelery": "mücevher",
            "men's clothing": "erkek kıyafetleri",
            "women's clothing": "kadın kıyafetleri",
            // ... diğer çeviriler
        };
        return translations[text] || text; // Eğer çeviri yoksa, orijinal metni döndür
    };

    //------------------------------------------- 

    useEffect(() => {
        getAllCategories();
    }, [])

    // ------------------------- Kategoriler alt  sekmeler
    const [anchorEl, setAnchorEl] = useState(null);

    //!  hangi buton altında açılmasını istiyorsan o butonun html etiketini  vermen lazım. currentTarget ile yakaladık
    const openMenu = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const closeMenu = () => {
        setAnchorEl(null);
    }

    // const openControl = anchorEl ? true : false;
    const openControl = Boolean(anchorEl)


    //! ------------------------------------------- 
    return (
        <Box >
            <Box sx={{
                display: { xs: 'none', md: 'flex' },
                marginTop: '20px',
                marginLeft: '30px',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>

                <Box sx={{ fontSize: '16px', fontFamily: 'Gluten', }}>
                    <h3>kategoriler</h3>
                </Box>

                <FormGroup
                    sx={{
                        gap: { xs: 0, md: 3 },
                        display: 'flex',
                        flexDirection: { xs: 'row', md: 'column' },
                        minHeight: '69vh'
                    }}>
                    {
                        categories && categories.map((category, index) => (
                            <FormControlLabel key={index}
                                control={<Checkbox onChange={(e) => handleCategory(e, category)} />}
                                label={
                                    <Typography sx={{ fontSize: '16px' }}>
                                        {translateToTurkish(category)}
                                    </Typography>
                                }
                            // label={category}  
                            />
                        ))
                    }
                </FormGroup>

            </Box >

            {/* //-------------------------------------------  */}

            <Box sx={{
                display: { xs: 'flex', md: 'none' },
                marginBottom: '20px'
            }}>
                <IconButton
                    size="large"
                    color="inherit"
                    onClick={openMenu} // Menu'yu açacak fonksiyon
                >
                    <MoreVertIcon />

                    <Box sx={{ marginLeft: '10px' }}>
                        <Typography sx={{ fontSize: '16px', fontFamily: 'Gluten', fontWeight: 'bold' }}>
                            kategoriler
                        </Typography>
                    </Box>
                </IconButton>

                {/* //------------------------------------------- Dinamik menu ogeleri */}

                <Menu
                    anchorEl={anchorEl}
                    open={openControl}
                    onClose={closeMenu}
                >
                    {/* Menü Öğelerini Dinamik Olarak Render Et */}
                    {
                        categories && categories.map((category, index) => (
                            <MenuItem key={index} sx={{ gap: 1, fontSize: '12px' }}>
                                <FormControlLabel
                                    control={<Checkbox onChange={(e) => handleCategory(e, category)} />}
                                    label={
                                        <Typography sx={{ fontSize: '12px' }}>
                                            {translateToTurkish(category)}
                                        </Typography>
                                    }
                                />
                            </MenuItem>
                        ))
                    }
                </Menu>
            </Box>




        </Box >
    )
}

export default Category