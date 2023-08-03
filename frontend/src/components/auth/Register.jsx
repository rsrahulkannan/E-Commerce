import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'

const Register = () => {
    return (
        <>
            <div class="splash-container">
                <div class="card ">
                    <div class="card-header text-center">
                        <Link to={`/`}>
                            <img class="logo-img" src="../logo-main.png" alt="logo" />
                        </Link>
                        <h3 class="mb-1">Sign Up</h3>
                        <span class="splash-description">Please enter your user information.</span>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="form-group">
                                <input class="form-control form-control-lg" id="fullname" type="text" placeholder="Full Name" autocomplete="off" />
                            </div>
                            <div class="form-group">
                                <input class="form-control form-control-lg" id="email" type="email" placeholder="Email" autocomplete="off" />
                            </div>
                            <div class="form-group">
                                <input class="form-control form-control-lg" id="password" type="password" placeholder="Password" />
                            </div>
                            <div class="form-group">
                                <input class="form-control form-control-lg" id="password" type="password" placeholder="Confirm Password" />
                            </div>
                            <div class="form-group">
                                <label class="custom-control custom-checkbox">
                                    <input class="custom-control-input" type="checkbox" />
                                    <span class="custom-control-label">By creating an account, you agree the <Link to={'/terms-conditions'} target='__blank'>terms and conditions.</Link></span>
                                </label>
                            </div>
                            <button type="submit" class="btn btn-primary btn-lg btn-block">Register My Account</button>
                        </form>
                    </div>
                    <div class="card-footer bg-white">
                        <p>Already member? <Link to={'/login'} className="text-secondary">Login Here.</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register