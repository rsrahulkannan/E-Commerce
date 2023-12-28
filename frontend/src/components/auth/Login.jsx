import React, { useState } from 'react'
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Auth.css'
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const { setAuth } = useAuth();

    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/dashboard';
    console.log(location.state?.from);

    const submitHandler = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        
        const formData = new URLSearchParams();
        formData.append('email', email);
        formData.append('password', password);

        await axios.post('http://localhost:5001/api/users/auth', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true,
        })
        .then((res) => {
            console.log('API response data:', res.data);
			localStorage.setItem('jwt-auth-token', res.data.data.token);
            const accessToken = res.data.data.token;
            toast.success(res?.data?.message || 'Login successfull!')
            setAuth({ accessToken })
            navigate(from, { replace: true });
        })
        .catch((err) => {
            console.error('Error:', err);
            toast.error(err.response?.data?.message || 'Login failed, Try again!')
            setIsLoading(false);
        })
    }
    

    return (
        <>
            <div className="splash-container">
                <div className="card ">
                    <div className="card-header text-center">
                        <Link to={`/`}>
                            <img className="logo-img" src="../logo-main.png" alt="logo" />
                        </Link>
                        <h3 className="mb-1">Sign In</h3>
                        <span className="splash-description">Please enter your user information.</span>
                    </div>
                    <div className="card-body">
                        <form onSubmit={submitHandler}>
                            <div className="form-group">
                                <input 
                                    className="form-control form-control-lg" 
                                    type="text" 
                                    placeholder="Email Id"
                                    onChange={(e) => setEmail(e.target.value)} 
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    className="form-control form-control-lg" 
                                    type="password" 
                                    placeholder="Password" 
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label className="custom-control custom-checkbox">
                                    <input className="custom-control-input" type="checkbox" />
                                    <span className="custom-control-label">Remember Me</span>
                                </label>
                            </div>
                            {
                                isLoading ?
                                <div className='text-center'>
                                    <span className="dashboard-spinner spinner-danger spinner-sm"></span>
                                </div> :
                            <   button type="submit" className="btn btn-primary btn-lg btn-block">Sign in</button>
                            }
                        </form>
                    </div>
                    <div className="card-footer bg-white p-0  ">
                        <div className="card-footer-item card-footer-item-bordered">
                            <Link to={`/register`} className="footer-link">Create An Account</Link>
                        </div>
                        <div className="card-footer-item card-footer-item-bordered">
                            <Link to={`/forgot-password`} className="footer-link">Forgot Password</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login