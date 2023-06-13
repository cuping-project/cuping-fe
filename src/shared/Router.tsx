import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import OwnerPage from '../pages/OwnerPage/OwnerPage';
import UserSignup from '../pages/Signup/UserSignup/UserSignup';
import BeanStats from '../components/BeanStats/BeanStats';
import Details from '../pages/Details/Details';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ownerpage" element={<OwnerPage />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/bean" element={<BeanStats />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
