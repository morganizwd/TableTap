import React from 'react';
import './App.css';
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

function App() {
  return (
    <div className="App">
      <Header/>
      {/* <RestaurantsPage/> */}
      {/* <RestaurantProfile/> */}
      {/* <UserProfile/> */}
      {/* <RestaurantAdminPage/> */}
      {/* <SuperAdminPage/> */}
      {/* <CreateReservationPage/> */}
      {/* <AboutPage/> */}
      {/* <ContactPage/> */}
      <Footer/>
    </div>
  );
}

export default App;