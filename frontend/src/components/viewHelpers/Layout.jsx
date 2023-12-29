import React from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../../hooks/useAuth';
import Header from '../viewHelpers/Header'
import Sidebar from '../viewHelpers/Sidebar'
import Footer from '../viewHelpers/Footer'

const Layout = () => {
  const { auth } = useAuth();

  return (
    <>
      {
        auth?.user ? (
          <>
            <ToastContainer />
            <Header />
            <Sidebar />
            <div className="dashboard-wrapper">
              <div className="container-fluid dashboard-content ">
                <Outlet />
              </div>
              <Footer />
            </div>
          </>
        ) : (
          <>
            <ToastContainer />
            <Outlet />
          </>
        )
      }
    </>
  )
}

export default Layout