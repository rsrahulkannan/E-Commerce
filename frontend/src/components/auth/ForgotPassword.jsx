import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css'

const ForgotPassword = () => {
    return (
        <>
            <div class="splash-container">
                <div class="card ">
                    <div class="card-header text-center">
                        <Link to={`/`}>
                            <img class="logo-img" src="../logo-main.png" alt="logo" />
                        </Link>
                        <h3 class="mb-1">Forgot Password</h3>
                        <span class="splash-description">Please enter your user information.</span>
                    </div>
                    <div class="card-body">
                        <form>
                            <p>Don't worry, we'll send you an email to reset your password.</p>
                            <div class="form-group">
                                <input class="form-control form-control-lg" id="email" type="email" placeholder="Email" autocomplete="off" />
                            </div>
                            <button type="submit" class="btn btn-primary btn-lg btn-block">Reset Password</button>
                        </form>
                    </div>
                    <div class="card-footer text-center">
                        <span>Don't have an account? <Link to={'/register'}>Sign Up</Link></span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword