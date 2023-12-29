import React from 'react'
import { Link } from 'react-router-dom'

const Breadcrumb = ({ title, description }) => {
    return (
        <>
            <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="page-header">
                        <h3 className="mb-2">{title}</h3>
                        <p className="pageheader-text">{description}</p>
                        <div className="page-breadcrumb">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link className="breadcrumb-link">Dashboard</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">{title}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Breadcrumb