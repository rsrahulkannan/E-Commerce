import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css'

const Login = () => {
    return (
        <>
            <div class="splash-container">
                <div class="card ">
                    <div class="card-header text-center">
                        <Link to={`/`}>
                            <img class="logo-img" src="../logo-main.png" alt="logo" />
                        </Link>
                        <h3 class="mb-1">Sign In</h3>
                        <span class="splash-description">Please enter your user information.</span>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="form-group">
                                <input class="form-control form-control-lg" id="username" type="text" placeholder="Username" autocomplete="off" />
                            </div>
                            <div class="form-group">
                                <input class="form-control form-control-lg" id="password" type="password" placeholder="Password" />
                            </div>
                            <div class="form-group">
                                <label class="custom-control custom-checkbox">
                                    <input class="custom-control-input" type="checkbox" />
                                    <span class="custom-control-label">Remember Me</span>
                                </label>
                            </div>
                            <button type="submit" class="btn btn-primary btn-lg btn-block">Sign in</button>
                        </form>
                    </div>
                    <div class="card-footer bg-white p-0  ">
                        <div class="card-footer-item card-footer-item-bordered">
                            <Link to={`/register`} className="footer-link">Create An Account</Link>
                        </div>
                        <div class="card-footer-item card-footer-item-bordered">
                            <Link to={`/forgot-password`} className="footer-link">Forgot Password</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login