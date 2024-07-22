import React from 'react';
import {  Router, Route , Routes  } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import SideNav from './components/SideNav';
import Footer from './components/Footer';
import Users from './pages/Users';
import Shops from './pages/Shops';
import Dealer from './pages/Dealer';
import Demo from './pages/Demo';

import AddShop from './pages/AddShop';
import "./styles/App.css";
import AddDealer from './pages/AddDealer';

function App() {
  return (
    <div>
      <div className="App">
       

        <div className="body-content">
      <div className='nav-lay-container'>
        <div className="navbar-side">
          <SideNav />
        </div>
        <div className="content-container">
        <Routes>
        <Route index element={<Login/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/users" element={<Users/>} />
          <Route path="/shop" element={<Shops/>} />
          <Route path="/dealer" element={<Dealer/>} />
          <Route path="/shop/add_shop" element={<AddShop/>} />
          <Route path="/dealer/add_dealer" element={<AddDealer/>} />
          <Route path="/demo" element={<Demo/>} />
     
        </Routes>
         
        </div>
      </div>
      
    </div>
        
      </div>
    </div>
  );
}

export default App;
