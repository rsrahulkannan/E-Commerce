import React from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Header from '../viewHelpers/Header'
import Sidebar from '../viewHelpers/Sidebar'
import Footer from '../viewHelpers/Footer'
import { useSelector } from 'react-redux';

const Layout = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      {
        currentUser ? (
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