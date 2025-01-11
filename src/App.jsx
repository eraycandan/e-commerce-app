import { useEffect } from 'react'
import './App.css'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import RouterConfig from './config/RouterConfig'
import Spinner from './components/Spinner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FavoriteDetail from './components/FavoriteDetail';
import BasketDetail from './components/BasketDetail';

import { useDispatch, useSelector } from 'react-redux';
import productService from './services/ProductService';

import { setCurrentLoginUser, setFavoriteProductsApp, setProducts } from './redux/appSlice';
import { setBasket } from './redux/basketSlice';

import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';



function App() {

  // login olunduysa navbar gelsin
  const { currentUser, darkMode } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  //---------------------------------- sayfa çağırıldığında tüm producsları çağır - redux tarafından silinmemesi için

  const getAllProducts = async () => {
    const products = await productService.getAllProducts();
    dispatch(setProducts(products));
  }

  useEffect(() => {
    getAllProducts();
  }, []);
  //---------------------------------- sayfa çağırıldığında userları çağır
  //! hem reduxa basmış olduk sayfaya giriş olduğunda  locale basıyoduk zaten

  useEffect(() => {
    const currentUserString = localStorage.getItem("currentLoginUser");
    if (currentUserString) {
      // console.log(currentUserString)  //! string döndüğü için bunu JSON parse ile obje çeviriyoruz
      const currentUser = JSON.parse(currentUserString)
      // console.log(currentUser)
      dispatch(setCurrentLoginUser(currentUser))
    }
  }, []);

  //---------------------------------- sayfa çağırıldığında sepet ürünleri getir
  useEffect(() => {
    const basketString = localStorage.getItem("basket");
    if (basketString) {
      const basket = JSON.parse(basketString);
      dispatch(setBasket(basket))
    }
  }, [])
  //---------------------------------- sayfa çağırıldığında favori ürünleri getir
  useEffect(() => {
    const favoriteString = localStorage.getItem("favorite");
    if (favoriteString) {
      const favorite = JSON.parse(favoriteString);
      // console.log(favorite)
      dispatch(setFavoriteProductsApp(favorite))
    }
  }, [])

  //---------------------------------- karanlık - aydınlık modu

  //? global özellik atama özellikle MUI kullanımda
  // Tema yapılandırması
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',

      background: {
        default: darkMode ? '#121212' : '#fff',  // Dark mode'da siyah, light mode'da açık renk

      },
      appbar: {
        default: darkMode ? '#121212' : '#01579b',
      },
      boxshadow: {
        default: darkMode ? 'none' : '2px 2px 10px lightgrey',
        hover: darkMode ? 'none' : '4px 4px 10px grey',
      },
      textcolor: {
        default: darkMode ? '#fff' : 'gray',
      }
    },

    typography: {
      fontFamily: '"Roboto", serif;',
    }
  });


  //!---------------------------------- 
  return (
    <div>
      <ThemeProvider theme={theme}> {/* Tema sağlayıcısı */}
        <CssBaseline /> {/* CSS sıfırlama ve tema varsayılanlarını uygular */}
        <div>
          {
            currentUser && <Navbar />
          }
          <RouterConfig />
          <ToastContainer autoClose={2000} style={{ fontSize: '13px' }} />
          <Spinner />
          <BasketDetail />
          <FavoriteDetail />
          {
            currentUser && <Footer />
          }

        </div>
      </ThemeProvider>
    </div>
  )
}


//* mui - mui icons
// typescript
//* redux toolkit
// react icons
//* json server
//* axios
//* formik & yup
//* react router dom
//* react toastify

export default App



