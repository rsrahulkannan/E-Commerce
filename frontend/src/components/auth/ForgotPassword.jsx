import { Fragment, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import './Auth.css'

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        
        const formData = new URLSearchParams();
        formData.append('email', email);

        await axios.post('http://localhost:5001/api/users/forgot-password', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true,
        })
        .then((res) => {
            toast.success(res?.data?.message || 'Reset url link has been send to your email!')
            navigate('/')
        })
        .catch((err) => {
            toast.error(err.response?.data?.message || 'Reset url link has been send to your email!')
            setIsLoading(false);
        })
    }

    return (
        <Fragment>
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
                        <form onSubmit={submitHandler}>
                            <p>Don't worry, we'll send you an email to reset your password.</p>
                            <div className="form-group">
                                <input 
                                    className="form-control form-control-lg" 
                                    type="text" 
                                    placeholder="Email Id"
                                    onChange={(e) => setEmail(e.target.value)} 
                                />
                            </div>
                            {
                                isLoading ? 
                                <div className='text-center'>
                                    <span class="dashboard-spinner spinner-danger spinner-sm"></span>
                                </div> :
                                <button type="submit" className="btn btn-primary btn-lg btn-block">Reset Password</button>
                            }
                        </form>
                    </div>
                    <div className="card-footer text-center">
                        <span>Don't have an account? <Link to={'/register'}>Sign Up</Link></span>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ForgotPassword