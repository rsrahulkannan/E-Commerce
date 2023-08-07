import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css'

const ForgotPassword = () => {
    return (
        <>
            <div className="splash-container">
                <div className="card ">
                    <div className="card-header text-center">
                        <Link to={`/`}>
                            <img className="logo-img" src="../logo-main.png" alt="logo" />
                        </Link>
                        <h3 className="mb-1">Forgot Password</h3>
                        <span className="splash-description">Please enter your user information.</span>
                    </div>
                    <div className="card-body">
                        <form>
                            <p>Don't worry, we'll send you an email to reset your password.</p>
                            <div className="form-group">
                                <input className="form-control form-control-lg" id="email" type="email" placeholder="Email" />
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg btn-block">Reset Password</button>
                        </form>
                    </div>
                    <div className="card-footer text-center">
                        <span>Don't have an account? <Link to={'/register'}>Sign Up</Link></span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword