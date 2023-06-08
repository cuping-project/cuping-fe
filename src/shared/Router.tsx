import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import OwnerPage from '../pages/OwnerPage';
import SignUp from '../pages/SignUp/SignUp';
import Bean from '../pages/Bean/Bean';
import Details from '../pages/Details/Details';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ownerpage" element={<OwnerPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/bean" element={<Bean />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
