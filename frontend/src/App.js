import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/viewHelpers/Layout";
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import EmailVerify from './components/auth/EmailVerify';
import ResetPassword from './components/auth/ResetPassword';
import Dashboard from './components/user/Dashboard';
import Profile from "./components/user/Profile";
import PrivateRouter from "./components/auth/PrivateRouter";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* Public Routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/users/:id/verify/:token' element={<EmailVerify />} />
        <Route path='/users/:id/reset/:token' element={<ResetPassword />} />

        {/* User routes */}
        <Route element={<PrivateRouter />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>
    </Routes>
  )
}

export default App