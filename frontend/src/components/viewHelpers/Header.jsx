import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import './Viewhelper.css';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/user/userSlice.js';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);

    const firstName = currentUser?.firstName;
    const lastName = currentUser?.lastName;
    const username = `${firstName} ${lastName}`;
    const profilePicture = currentUser.profileImage 
        ? `http://localhost:5001/ProfilePictures/${currentUser.profileImage}` 
        : 'assets/images/avatar-1.jpg'
    ;

    const logout = async () => {
        toast.warning('You have been logged out from the system')
        dispatch(logOut())
    }

    return (
        <>
            <div className="dashboard-header">
                <nav className="navbar navbar-expand-lg bg-white fixed-top">
                    <Link to={`/`} className="navbar-brand" >
                        <img className="logo-header" src="../logo-main.png" alt="logo" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto navbar-right-top">
                            <li className="nav-item dropdown nav-user">
                                <a className="nav-link nav-user-img" href="#" id="navbarDropdownMenuLink2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src={profilePicture} alt="" className="user-avatar-md rounded-circle" /></a>
                                <div className="dropdown-menu dropdown-menu-right nav-user-dropdown" aria-labelledby="navbarDropdownMenuLink2">
                                    <div className="nav-user-info">
                                        <h5 className="mb-0 text-white nav-user-name">{username} </h5>
                                        <span className="status"></span><span className="ml-2">Available</span>
                                    </div>
                                    <Link to={`/profile`} className="dropdown-item" >
                                        <i className="fas fa-user mr-2"></i>Profile
                                    </Link>
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