import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <>
            <div className="nav-left-sidebar sidebar-dark">
                <div className="menu-list">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <Link to={`#`} className="d-xl-none d-lg-none" >
                            <i className="fa fa-fw fa-user-circle"></i>Dashboard
                        </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav flex-column">
                                <li className="nav-divider">
                                    Menu
                                </li>
                                <li className="nav-item ">
                                    <Link to={`/`} className="nav-link" >
                                        <i className="fa fa-fw fa-user-circle"></i>Dashboard
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Sidebar