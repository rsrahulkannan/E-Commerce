import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'

const App = () => {

  useEffect(() => {
      const getToken = async () => {
          try {
              const token = Cookies.get('userToken'); // Make sure 'userToken' is the correct cookie name
              console.log('Token:', Cookies);
  
              if (token) {
                  toast.success('Token generated');
              } else {
                  toast.error('No token');
              }
          } catch (error) {
              toast.error('Error getting token');
          }
      };
  
      getToken();
  }, []);
  return (
    <>
      <ToastContainer />
      <Outlet />
    </>
  )
}

export default App