import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //     const token = localStorage.getItem('jwt-auth-token');    
  //     if(!token) {
  //       navigate('/login')
  //     }
  // }, [navigate])

  return (
    <>
      <ToastContainer />
      <Outlet />
    </>
  )
}

export default App