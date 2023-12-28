import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import './Auth.css'

const Register = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        if(!firstName)
            toast.error('First name required')
        else if(!lastName)
            toast.error('Last name required')
        else if(!email)
            toast.error('Email required')
        else if(!password)
            toast.error('Password required')
        else if(password !== confirmPassword)
            toast.error('Password do not match')
        else {
            setIsLoading(true);

            const formData = new URLSearchParams();
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('email', email);
            formData.append('password', password);

            await axios.post('http://localhost:5001/api/users/', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                withCredentials: true,
            })
            .then((res) => {
                toast.success(res?.data?.message || 'Registration successfull!')
                navigate('/login')
            })
            .catch((err) => {
                toast.error(err.response?.data?.message || 'Registration failed, Try again!')
                setIsLoading(false);
            })
        }
    }

    return (
        <>
            <div className="splash-container">
                <div className="card ">
                    <div className="card-header text-center">
                        <Link to={`/`}>
                            <img className="logo-img" src="../logo-main.png" alt="logo" />
                        </Link>
                        <h3 className="mb-1">Sign Up</h3>
                        <span className="splash-description">Please enter your user information.</span>
                    </div>
                    <div className="card-body">
                        <form onSubmit={submitHandler}>
                            <div className="form-group">
                                <input
                                    className="form-control form-control-lg"
                                    type="text" 
                                    placeholder="First Name" 
                                    onChange={(e) => setFirstName(e.target.value)} 
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    className="form-control form-control-lg" 
                                    type="text" 
                                    placeholder="Last Name" 
                                    onChange={(e) => setLastName(e.target.value)} 
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    className="form-control form-control-lg" 
                                    type="email" 
                                    placeholder="Email" 
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
                                <input 
                                    className="form-control form-control-lg" 
                                    type="password" 
                                    placeholder="Confirm Password" 
                                    onChange={(e) => setConfirmPassword(e.target.value)} 
                                />
                            </div>
                            <div className="form-group">
                                <label className="custom-control custom-checkbox">
                                    <input className="custom-control-input" type="checkbox" />
                                    <span className="custom-control-label">By creating an account, you agree the <Link to={'/terms-conditions'} target='__blank'>terms and conditions.</Link></span>
                                </label>
                            </div>
                            {
                                isLoading ? 
                                <div className='text-center'>
                                    <span class="dashboard-spinner spinner-danger spinner-sm"></span>
                                </div> :
                                <button type="submit" className="btn btn-primary btn-lg btn-block">Register My Account</button>
                            }
                        </form>
                    </div>
                    <div className="card-footer bg-white">
                        <p>Already member? <Link to={'/login'} className="text-secondary">Login Here.</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register