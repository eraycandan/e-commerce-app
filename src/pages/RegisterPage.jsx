import React, { useState } from 'react'
// import "../css/LoginPage.css"
// import "../css/RegisterPage.css"
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { registerPageSchema } from '../schemas/RegisterPageSchema';

import { toast } from 'react-toastify';

import registerPageService from '../services/RegisterPageService';

import { Button, Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

import BgRegister from '../images/BgRegister.jpg'



function RegisterPage() {

    // const [showPassword, setShowPassword] = useState(false);
    // const handleClickShowPassword = () => setShowPassword((show) => !show);

    const navigate = useNavigate();     // kayıta yönlendirme için

    const theme = useTheme();
    //----------------------------------------------- FORMİKTEN GELEN DATAYI JSON SERVERA KAYDETME 
    const submit = async (values, action) => {
        // console.log(values, action);
        try {
            const payload = {
                id: String(Math.floor(Math.random() * 999999)),
                username: values.username,
                password: values.password,
                term: values.term,
                balance: 1000
            }
            const response = await registerPageService.register(payload) //! oluşturulan user servise yollandı
            // console.log(response);
            if (response) {
                clear();
                toast.success("kullanıcı oluşturuldu");
                navigate("/login");
            }
        } catch (error) {
            toast.error("kullanıcı kaydında hata oluştu !!" + error)
        }
    }

    //----------------------------------------------- FORMİK YUP
    const { values, handleSubmit, handleChange, errors, resetForm } = useFormik({
        initialValues: {
            username: '',
            password: '',
            confirmPassword: '',
            term: false,
        },
        onSubmit: submit,
        validationSchema: registerPageSchema
    });
    // console.log(formik)
    // console.log(errors);

    //----------------------------------------------- KONSOL TEMİZLEME
    const clear = () => {
        resetForm();
    }
    // style = {{ boxShadow: theme => theme.palette.boxshadow.default }

    //!-----------------------------------------------
    return (
        <Box sx={{
            width: '100%',
            height: '100vh',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-end',

            backgroundImage: `url(${BgRegister})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }} >

            {/* Overlay Katmanı */}
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

            <Box sx={{
                display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100vh',
                width: { xs: '100%', sm: '100%', md: '50%' },
                padding: { xs: '20px', md: '0px' }
            }}>

                {/* //------------------------------------ */}
                <form onSubmit={handleSubmit}
                    style={{
                        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                        width: '500px'
                    }}
                >              {/* //? formikten geldi- */}

                    <Typography
                        sx={{
                            fontFamily: 'Gluten', zIndex: 1,
                            color: theme => theme.palette.textcolor.default,
                        }}>
                        <h2>kayıt ol</h2>
                    </Typography>

                    <Box sx={{
                        boxShadow: theme => theme.palette.boxshadow.default,
                        width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        padding: '50px 0px', borderRadius: '10px'
                    }}>
                        {/* ---------------------------------------------- */}
                        <TextField       //! MUI den alındı
                            sx={{ width: '300px', marginBottom: '15px' }}
                            id="username"
                            label="kullanıcı adı"
                            // placeholder='kullanıcı adı'
                            value={values.username}         //? formikten geldi
                            onChange={handleChange}         //? formikten geldi
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {/* <PeopleIcon /> */}
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
                            sx={{ width: '300px', marginBottom: '15px' }}
                            id="password"
                            label="şifre"
                            type='password'
                            // type={showPassword ? 'text' : 'password'}
                            // placeholder='şifre'
                            value={values.password}     //? formikten geldi
                            onChange={handleChange}     //? formikten geldi
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {/* <IconButton
                                                onClick={handleClickShowPassword}
                                            >
                                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton> */}
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            variant="standard"
                            color='info'
                            helperText={errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}    //? yup
                        />
                        {/* ---------------------------------------------- */}
                        <TextField       //! MUI den alındı
                            sx={{ width: '300px', marginBottom: '15px' }}
                            id="confirmPassword"
                            label="şifre tekrarı"
                            type='password'
                            // type={showPassword ? 'text' : 'password'}
                            // placeholder='şifre'
                            value={values.confirmPassword}          //? formikten geldi
                            onChange={handleChange}                 //? formikten geldi
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {/* <IconButton
                                                aria-label={
                                                    showPassword ? 'hide the password' : 'display the password'
                                                }
                                                onClick={handleClickShowPassword}
                                            >
                                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton> */}
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            variant="standard"
                            color='info'
                            helperText={errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword}</span>}    //? yup
                        />
                        {/* ---------------------------------------------- */}
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <FormControlLabel
                                control={<Checkbox size='small'
                                    id='term'                           //? checkboxa yazılması lazım yup için
                                    checked={values.term}                 //? formikten geldi
                                    onChange={handleChange}             //? formikten geldi
                                />}
                                label={
                                    <Typography sx={{
                                        fontSize: '15px',
                                        color: theme => theme.palette.textcolor.default,
                                        zIndex: 1
                                    }}>
                                        kullanıcı sözleşmesini onaylıyorum
                                    </Typography>}
                                labelPlacement="end"
                            //? yup
                            />
                            {
                                errors.term && (
                                    <Typography variant="caption" sx={{ color: 'red', zIndex: 1 }}>
                                        {errors.term}
                                    </Typography>
                                )
                            }
                        </Box>

                        {/* ---------------------------------------------- */}

                        <div style={{ width: '50%', marginTop: '40px' }}>
                            <Box sx={{ marginTop: '15px', display: 'flex' }}>
                                <Button variant="contained" size='small' startIcon={<SendIcon />}
                                    type='submit'   //? forma gönderilir formik için
                                    sx={{ width: '50%', textTransform: 'none', color: '#fff', height: '30px', fontWeight: 'bold', marginRight: '10px', bgcolor: '#0277bd', border: 'none' }}
                                >
                                    Kayıt Ol
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
                                    onClick={() => navigate("/login")}
                                >
                                    Giriş Yap
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

export default RegisterPage