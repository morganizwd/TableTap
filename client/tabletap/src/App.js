import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
            <Routes>
              <Route path='/restaurants' element={<RestaurantsPage/>}></Route>
              <Route path='/restaurants/profile' element={<RestaurantProfile/>}></Route>
              <Route path='/user' element={<UserProfile/>}></Route>
              <Route path='/restaurant-admin-page' element={<RestaurantAdminPage/>}></Route>
              <Route path='/adminpage' element={<SuperAdminPage/>}></Route>
              <Route path='/restaurants/restaurant/reservation' element={<CreateReservationPage/>}></Route>
              <Route path='/about-us' element={<AboutPage/>}></Route>
              <Route path='/contacts' element={<ContactPage/>}></Route>
              <Route path='/registration' element={<RegistrationPage/>}/>
              <Route path='/login' element={<LoginPage/>}/>
            </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;