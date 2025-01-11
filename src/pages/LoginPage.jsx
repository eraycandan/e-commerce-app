import React, { useState } from 'react'
// import "../css/LoginPage.css"
// import "../css/RegisterPage.css"
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { loginPageSchema } from '../schemas/LoginPageSchema';

import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setLoading, setCurrentLoginUser } from '../redux/appSlice';

import loginPageService from '../services/LoginPageService';

import { Button, IconButton, useTheme, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import PeopleIcon from '@mui/icons-material/People';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

import BgLogin from '../images/BgLogin.jpg'




function LoginPage() {

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const navigate = useNavigate();     // kayıta yönlendirme için
    const dispatch = useDispatch();    // slice kısma yollancak

    const theme = useTheme();
    //----------------------------------------------- TÜM DATA VE GİRİLEN VERİ CHECK ETME 2

    const checkUser = (allUserList, username, password) => {
        const user = allUserList.find((user) => user.username === username && user.password === password)

        if (user) {
            return user;
        } else {
            return null;
        }
    }
    //----------------------------------------------- TÜM DATAYI ÇEKİP FORMİK YUPTAN GELEN VERİYİ CHECK ETME 1
    const submit = async (values, action) => {
        try {
            dispatch(setLoading(true))
            const response = await loginPageService.login();
            // console.log("API Response:", response); // Burada API cevabını kontrol edin
            // console.log(response);
            if (response) {
                const checkUserResponse = checkUser(response, values.username, values.password);  // gelen userlar ile girilen userları karşılaştırcaz
                // kullanıcı adı ve şifre doğru
                if (checkUserResponse) {
                    dispatch(setCurrentLoginUser(checkUserResponse));
                    localStorage.setItem("currentLoginUser", JSON.stringify(checkUserResponse));
                    navigate("/");
                } else {
                    //yanlış
                    toast.error("kullanıcı adı veya şifre hatalı !!")
                }
            }
        } catch (error) {
            toast.error("giriş yapılırken hata oluştu" + error)
        } finally {
            dispatch(setLoading(false));
        }
    }

    //----------------------------------------------- FORMİK YUP

    const { values, handleSubmit, handleChange, errors, resetForm } = useFormik({
        initialValues: {
            username: '',
            password: '',
            // confirmPassword: '',
            // term: false,
        },
        onSubmit: submit,
        validationSchema: loginPageSchema
    });
    // console.log(formik)
    // console.log(errors);

    //----------------------------------------------- KONSOL TEMİZLEME
    const clear = () => {
        resetForm();
    }
    //!-----------------------------------------------
    return (

        <Box sx={{
            width: '100%',
            height: '100vh',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',

            backgroundImage: `url(${BgLogin})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}>

            {/* -------------------------------------Overlay Katmanı */}
            <Box
                sx={{
                    position: 'absolute', // Görselin üstüne yerleştiriyoruz
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'light', // Dark mode'da koyulaşır, light mode'da olmaz
                }}
            />
            {/* ---------------------------------------------- */}

            <Box sx={{
                display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100vh',
                width: { xs: '100%', sm: '100%', md: '50%' },
                padding: { xs: '20px', md: '0px' }
            }}>
                {/* ---------------------------------------------- */}
                <form onSubmit={handleSubmit}
                    style={{
                        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                        width: '500px'
                    }}
                >              {/* //? handlesubmit formikten geldi- */}
                    {/* //------------------------------------ */}
                    <Typography
                        sx={{
                            fontFamily: 'Gluten', zIndex: 1,
                            color: theme => theme.palette.textcolor.default,
                        }}>
                        <h2>kullanıcı girişi</h2>
                    </Typography>
                    {/* //------------------------------------ */}
                    <Box sx={{
                        boxShadow: theme => theme.palette.boxshadow.default,
                        width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        padding: '50px 0px', borderRadius: '10px'
                    }}>
                        {/* ---------------------------------------------- */}
                        <TextField       //! MUI den alındı
                            sx={{ width: '50%', marginBottom: '15px' }}
                            id="username"
                            label="kullanıcı adı"
                            // placeholder='kullanıcı adı'
                            value={values.username}         //? formikten geldi
                            onChange={handleChange}         //? formikten geldi
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PeopleIcon />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            variant="standard"
                            color='info'
                            helperText={errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}    //? yup
                        />
                        {/* ---------------------------------------------- */}
                        <TextField       //! MUI den alındı
                            sx={{ width: '50%', marginBottom: '15px' }}
                            id="password"
                            label="şifre"
                            type={showPassword ? 'text' : 'password'}
                            // placeholder='şifre'
                            value={values.password}     //? formikten geldi
                            onChange={handleChange}     //? formikten geldi
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton onClick={handleClickShowPassword} >
                                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            variant="standard"
                            color='info'
                            helperText={errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}    //? yup
                        />
                        {/* ---------------------------------------------- */}
                        <div style={{ width: '50%' }}>
                            <Box sx={{ marginTop: '15px', display: 'flex' }}>
                                <Button variant="contained" size='small' startIcon={<SendIcon />}
                                    type="submit"   //? forma gönderilir formik için
                                    sx={{ width: { xs: '60%', md: '50%' }, textTransform: 'none', color: '#fff', height: '30px', fontWeight: 'bold', marginRight: '10px', bgcolor: '#0277bd', border: 'none' }}
                                >
                                    Giriş  Yap
                                </Button>
                                <Button variant="contained" size='small' startIcon={<DeleteIcon />}
                                    sx={{ width: '50%', textTransform: 'none', color: '#fff', fontWeight: 'bold', height: '30px', bgcolor: '#9e9e9e', border: 'none' }}
                                    onClick={clear}
                                >
                                    Temizle
                                </Button>
                            </Box>
                            <Box sx={{ marginTop: '15px' }}>
                                <Button variant="contained" size='small'
                                    sx={{ textTransform: 'none', color: '#fff', fontWeight: 'bold', height: '30px', bgcolor: '#ff8f00', border: 'none', width: '100%' }}
                                    onClick={() => navigate("/register")}
                                >
                                    Kayıt Ol
                                </Button>
                            </Box>
                        </div>
                        {/* ---------------------------------------------- */}
                    </Box>
                </form>

                {/* ---------------------------------------------- */}

            </Box>
        </Box>
    )
}

export default LoginPage