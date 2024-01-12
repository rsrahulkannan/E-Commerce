import { Fragment, useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import './Auth.css'
import { useSelector } from "react-redux"
import Dashboard from "../user/Dashboard"

const ResetPassword = () => {
    const { currentUser } = useSelector((state) => state.user);

    const [validUrl, setValidUrl] = useState(true);
    const [isLoading, setIsLoading] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    
    const param = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `http://localhost:5001/api/users/${param.id}/reset/${param.token}`;
                const { data } = await axios.get(url);
                setValidUrl(true);
            } catch (error) {
                setValidUrl(false);
                toast.error('Url is expired or broken, Try again after some times')
                navigate('/login')
            } 
        }
        verifyEmailUrl();
    }, [param, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            toast.error('Password do not match')
        } else {
            setIsLoading(true);
            
            const formData = new URLSearchParams();
            formData.append('password', password);
    
            await axios.post(`http://localhost:5001/api/users/${param.id}/reset/${param.token}`, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                withCredentials: true,
            })
            .then((res) => {
                console.log('API response data:', res.data);
                toast.success(res?.data?.message || 'Password has been updated success fully!')
            })
            .catch((err) => {
                console.error('Error:', err);
                toast.error(err.response?.data?.message || 'Something went wrong! Try after sometimes!')
                setIsLoading(false);
            })
            .finally(() => {
                navigate('/login')
            })
        }
    }

    return (
        <Fragment>
            {
                validUrl ?
                <div className="splash-container">
                    <div className="card ">
                        <div className="card-header text-center">
                            <Link to={`/`}>
                                <img className="logo-img" src="../logo-main.png" alt="logo" />
                            </Link>
                            <h3 className="mb-1">Reset Password</h3>
                            <span className="splash-description">Please enter your new password.</span>
                        </div>
                        <div className="card-body">
                            <form onSubmit={submitHandler}>
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
                </div> :
                <Dashboard />
            }
        </Fragment>
    )
}

export default ResetPassword