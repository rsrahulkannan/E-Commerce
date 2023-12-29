import React from 'react'
import Breadcrumb from '../viewHelpers/Breadcrumb'
import useAuth from '../../hooks/useAuth';

const Profile = () => {
    const { auth } = useAuth();

    const firstName = auth?.user?.firstName;
    const lastName = auth?.user?.lastName;
    const email = auth?.user?.email;
    const username = `${firstName} ${lastName}`;
    const profilePicture = auth.user.profileImage
        ? `http://localhost:5001/ProfilePictures/${auth.user.profileImage}`
        : 'assets/images/avatar-1.jpg'
        ;

    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const joinedDate = auth?.user?.createdAt ? new Date(auth?.user?.createdAt).toLocaleDateString('en-US', options) : '';

    return (
        <>
            <Breadcrumb title='My Profile' description='My profile' />
            <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="card influencer-profile-data">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-xl-2 col-lg-4 col-md-4 col-sm-4 col-12">
                                    <div className="text-center">
                                        <img src={profilePicture} alt="User Avatar" className="rounded-circle user-avatar-xxl" />
                                    </div>
                                </div>
                                <div className="col-xl-10 col-lg-8 col-md-8 col-sm-8 col-12">
                                    <div className="user-avatar-info">
                                        <div className="m-b-20">
                                            <div className="user-avatar-name">
                                                <h2 className="mb-1">{username}</h2>
                                            </div>
                                        </div>
                                        <div className="user-avatar-address">
                                            <p className="border-bottom pb-3">
                                                <span className="d-xl-inline-block d-block mb-2"><i className="fa fa-envelope mr-2 text-primary "></i>{email}</span>
                                            </p>
                                            <div className="mt-3">
                                                <span className="mb-2 ml-xl-4 d-xl-inline-block d-block">Joined date: {joinedDate}  </span> &nbsp;&nbsp;&nbsp;
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile