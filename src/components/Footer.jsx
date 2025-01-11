import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Divider, Stack, TextField } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';





function Footer() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);



    //------------------------------------------- api yüzünden footer önden yüklenmemesi için
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(true);
        }, 3000)

        return () => clearTimeout(timer); // Temizlik
    }, [])

    //------------------------------------------- iletişim

    const [dialogOpen, setDialogOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    // const [error, setError] = useState('');


    const handleSubmit = () => {
        if (!email || !message) {
            toast.error("lütfen tüm alanları doldurun")
        } else {
            toast.success("mesajınız iletildi")
            setDialogOpen(false);
            setEmail('');
            setMessage('');
        }
    }

    //! -------------------------------------------------------------------------
    return (
        loading &&
        <div  >
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ bottom: 0, top: 'auto', width: '100%' }}>
                    <Toolbar sx={{ bgcolor: '#424242', height: '100px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        {/* //------------------------ */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Box sx={{ display: 'flex', gap: { xs: 0, md: 2, lg: 4 } }}>
                                <Link to="https://www.youtube.com" target="_blank" >
                                    <IconButton size="large"
                                        sx={{
                                            color: '#fff',
                                            transition: 'color 0.3s ease-in', // Yumuşak renk geçişi
                                            ":hover": {
                                                // fontSize: '37px', // Hover durumunda ikon boyutunu büyütme
                                                color: '#ef5350', // Hover rengi, örneğin YouTube kırmızı rengi
                                            }
                                        }}>
                                        <YouTubeIcon
                                            sx={{
                                                fontSize: {
                                                    xs: '25px',
                                                    md: '35px'
                                                }
                                            }} />
                                    </IconButton>
                                </Link>

                                <Link to="https://x.com" target="_blank" >
                                    <IconButton size="large"
                                        sx={{
                                            color: '#fff',
                                            transition: 'color 0.3s ease-in', // Yumuşak renk geçişi
                                            ":hover": {
                                                // fontSize: '37px', // Hover durumunda ikon boyutunu büyütme
                                                color: '#212121',
                                            }
                                        }}>
                                        <XIcon sx={{
                                            fontSize: {
                                                xs: '25px',
                                                md: '35px'
                                            }
                                        }} />
                                    </IconButton>
                                </Link>

                                <Link to="https://www.instagram.com" target="_blank" >
                                    <IconButton size="large"
                                        sx={{
                                            color: '#fff',
                                            transition: 'color 0.3s ease-in', // Yumuşak renk geçişi
                                            ":hover": {
                                                // fontSize: '37px', // Hover durumunda ikon boyutunu büyütme
                                                color: '#f48fb1',
                                            }
                                        }}>
                                        <InstagramIcon sx={{
                                            fontSize: {
                                                xs: '25px',
                                                md: '35px'
                                            }
                                        }} />
                                    </IconButton>
                                </Link>

                                <Link to="https://www.facebook.com" target="_blank" >
                                    <IconButton size="large"
                                        sx={{
                                            color: '#fff',
                                            transition: 'color 0.3s ease-in', // Yumuşak renk geçişi
                                            ":hover": {
                                                // fontSize: '37px', // Hover durumunda ikon boyutunu büyütme
                                                color: '#64b5f6',
                                            }
                                        }}>
                                        <FacebookIcon sx={{
                                            fontSize: {
                                                xs: '25px',
                                                md: '35px'
                                            }
                                        }} />
                                    </IconButton>
                                </Link>
                            </Box>

                            <Typography variant='body2'
                                sx={{
                                    fontSize: {
                                        xs: '12px',
                                        md: '14px'
                                    }
                                }}>
                                © 1992-2024 / @eraycandan
                            </Typography>
                        </Box>
                        {/* //------------------------ */}
                        <Box >
                            <Stack direction="row" spacing={1}
                                divider={<Divider orientation='vertical' flexItem sx={{ bgcolor: '#fff' }} />}
                            >

                                <Button onClick={() => navigate("/")}
                                    variant='none' color='inherit'
                                    sx={{
                                        textDecoration: 'none', color: '#fff', fontFamily: 'arial',
                                        transition: ' 0.2s  ease-in',
                                        fontSize: {
                                            xs: '12px',
                                            md: '16px'
                                        },
                                        ":hover": {
                                            // fontSize: '15px',
                                            // marginTop: '15px',
                                            color: '#ffc107'
                                        }
                                    }}>
                                    Anasayfa
                                </Button>

                                {/* //----------- */}

                                <Box>
                                    <Button onClick={() => setDialogOpen(true)}
                                        variant='none' color='inherit'
                                        sx={{
                                            textDecoration: 'none', color: '#fff', fontFamily: 'arial',
                                            transition: ' 0.2s  ease-in',
                                            fontSize: {
                                                xs: '12px',
                                                md: '16px'
                                            },
                                            ":hover": {
                                                // fontSize: '15px',
                                                // marginTop: '15px',
                                                color: '#ffc107'
                                            }
                                        }} >
                                        İletişim
                                    </Button>

                                    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}
                                        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <DialogTitle>Bize Ulaşın</DialogTitle>

                                        <DialogContent>
                                            <DialogContentText>
                                                Bir sorunuz varsa lütfen aşağıdaki mail adresi ve açıklamayı doldurun
                                            </DialogContentText>
                                        </DialogContent>

                                        <Box sx={{ gap: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                            <TextField
                                                // autoFocus
                                                required
                                                // margin="dense"
                                                id="name"
                                                name="email"
                                                label="Email Adres"
                                                type="email"
                                                // fullWidth
                                                variant="standard"
                                                sx={{ width: '90%' }}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />

                                            <TextField
                                                id="standard-multiline-static"
                                                // label="Multiline"
                                                multiline
                                                rows={3}
                                                // defaultValue="Not"
                                                placeholder='Not'
                                                variant="outlined"
                                                sx={{ width: '90%' }}
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                            />
                                        </Box>

                                        <DialogActions sx={{ marginTop: '10px', marginRight: '20px' }}>
                                            <Button variant='outlined' color='inherit' size='small' onClick={handleSubmit} >Gönder</Button>
                                            <Button variant='outlined' color='inherit' size='small' onClick={() => setDialogOpen(false)} >İptal</Button>
                                        </DialogActions>
                                    </Dialog>
                                </Box>


                            </Stack>
                        </Box>




                    </Toolbar>
                </AppBar>

            </Box>
        </div>
    )
}

export default Footer