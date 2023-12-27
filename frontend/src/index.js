import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import EmailVerify from './components/auth/EmailVerify';
import ResetPassword from './components/auth/ResetPassword';
import Dashboard from './components/user/Dashboard';
import Logout from './components/auth/Logout';

const token = localStorage.getItem('jwt-auth-token');
const routes = (
  <Route path='/' element={<App />}>
    {token ? (
      <>
        <Route path="/" element={<Dashboard />} />
      </>
    ) : (
      <>
			  <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/users/:id/verify/:token' element={<EmailVerify />} />
        <Route path='/users/:id/reset/:token' element={<ResetPassword />} />
      </>
    )}
    <Route path="/logout" element={<Logout />} />
        <Route path='/login' element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="*" element={<Navigate replace to="/" />} />
  </Route>
);
const router = createBrowserRouter(
  createRoutesFromElements(routes)
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
