import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Cart from './Pages/Cart';
import Register from './Pages/Register';
import ProductDetails from './Pages/ProductDetails';
import Account from './Pages/Account';
import Accessore from './Pages/Accessore';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Search from './Pages/Search';
import { Storecontext } from './context/Storecontext';
function App() {
  const { setLoginData } = useContext(Storecontext)
  // const [loginData, setLoginData] = useState(null);
  const [basic, setBasic] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLoginData(); /// استدعي الفنكشن لفك تشفير التوكن
    }

  }, [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const token = localStorage.getItem('token');
        // if (token) {
        //   const decoded = jwtDecode(token);
        //   setLoginData(decoded);
        //   console.log(decoded);
        // }
        const { data } = await axios.get('http://localhost:3002/api/v1/basic/find');
        setBasic(data.findAll);
        console.log('Data loaded:', data.findAll);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('token');
    setLoginData(null);
    navigate('/login');
  };

  return (
    <>
      {/* {loginData !== null && ( */}
      <Navbar logout={handleLogout} basic={basic} />
      {/* )} */}
      <Routes>
        <Route element={<Home />} path='/' />
        <Route element={<Login setUserData={setLoginData} />} path='/login' />
        <Route element={<Cart />} path='/cart' />
        <Route element={<Register />} path='/register' />
        <Route element={<ProductDetails />} path='/product/:id' />
        <Route element={<Account />} path='/profile' />
        <Route element={<Accessore />} path='/collection/:id' />
        <Route element={<Search />} path='/search' />

      </Routes>
      <Footer />
    </>
  );
}

export default App;
