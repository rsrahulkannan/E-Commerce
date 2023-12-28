import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthProvider'
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';

const Header = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const { auth } = useAuth();
    
    const firstName = auth?.user?.firstName;
    const lastName = auth?.user?.lastName;
    const [username, setUsername] = useState(`${firstName} ${lastName}`);

    const logout = async () => {
        setAuth({});
        toast.warning('You have been logged out from the system')
        navigate('/');
    }

    return (
        <>
            <div className="dashboard-header">
                <nav className="navbar navbar-expand-lg bg-white fixed-top">
                    <Link to={`/`} className="navbar-brand" >
                        Concept
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto navbar-right-top">
                            <li className="nav-item dropdown nav-user">
                                <a className="nav-link nav-user-img" href="#" id="navbarDropdownMenuLink2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="assets/images/avatar-1.jpg" alt="" className="user-avatar-md rounded-circle" /></a>
                                <div className="dropdown-menu dropdown-menu-right nav-user-dropdown" aria-labelledby="navbarDropdownMenuLink2">
                                    <div className="nav-user-info">
                                        <h5 className="mb-0 text-white nav-user-name">{username} </h5>
                                        <span className="status"></span><span className="ml-2">Available</span>
                                    </div>
                                    <a className="dropdown-item" href="#"><i className="fas fa-user mr-2"></i>Account</a>
                                    <a className="dropdown-item" href="#"><i className="fas fa-cog mr-2"></i>Setting</a>
                                    <a className="dropdown-item" href="#" onClick={logout}><i className="fas fa-power-off mr-2"></i>Logout</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Header