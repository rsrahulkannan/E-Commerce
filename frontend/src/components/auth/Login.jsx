import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie'

const Login = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

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
            toast.success(res?.data?.message || 'Login successfull!')
            navigate('/')
        })
        .catch((err) => {
            console.error('Error:', err);
            toast.error(err.response?.data?.message || 'Login failed, Try again!')
            setIsLoading(false);
        })
    }

    useEffect(() => {
        const getToken = async () => {
            try {
                const token = Cookies.get('userToken'); // Make sure 'userToken' is the correct cookie name
                console.log('Token:', token);
    
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

    // useEffect(() => {
    //     const token = Cookies.get('userToken');
    //     console.log('Token:' + token);

    //     if(token) {
    //         // navigate('/')
    //     }
    // }, [])
    

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
                                    <span class="dashboard-spinner spinner-danger spinner-sm"></span>
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