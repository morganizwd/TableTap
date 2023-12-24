import React from 'react';
import './App.css';
import { CssBaseline, Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth.js';
import { Navigate } from 'react-router-dom';

import Header from './Components/header';
import Footer from './Components/footer';
import RestaurantsPage from './Components/RestaurantsPage/RestaurantsPage';
import RestaurantProfile from './Components/RestaurantsPage/RestaurantProfile';
import UserProfile from './Components/UserProfile';
import RestaurantAdminPage from './Components/RestaurantAdminPage';
import SuperAdminPage from './Components/SuperAdminPage';
import CreateReservationPage from './Components/CreateReservationPage';
import AboutPage from './Components/AboutPage';
import ContactPage from './Components/Contacts';
import RegistrationPage from './Components/RegistrationPage';
import LoginPage from './Components/loginPage';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  
  React.useEffect(() => {
    if (window.localStorage.getItem('token')) {
      dispatch(fetchAuthMe());
    }
  }, [dispatch]);

  return (
      <div className="App">
        <CssBaseline>
          <Box display="flex" flexDirection="column" minHeight="100vh">
            <Header/>
                <Routes>
                  <Route path='/restaurants' element={<RestaurantsPage/>}></Route>
                  <Route path='/restaurants/profile/:id' element={<RestaurantProfile/>}></Route>
                  <Route path='/user' element={<UserProfile/>}></Route>
                  <Route path='/restaurant-admin-page' element={<RestaurantAdminPage/>}></Route>
                  <Route path='/adminpage' element={<SuperAdminPage/>}></Route>
                  <Route path='/restaurants/restaurant/reservation' element={<CreateReservationPage/>}></Route>
                  <Route path='/about-us' element={<AboutPage/>}></Route>
                  <Route path='/contacts' element={<ContactPage/>}></Route>
                  {!isAuth && <Route path='/registration' element={<RegistrationPage/>} />}
                  {!isAuth && <Route path='/login' element={<LoginPage/>} />}
                  {isAuth && <Route path="*" element={<Navigate to="/" />} />}
                  {!isAuth && <Route path="*" element={<Navigate to="/login" />} />}
                </Routes>
            <Footer/>
          </Box>
        </CssBaseline>
      </div>
  );
}

export default App;