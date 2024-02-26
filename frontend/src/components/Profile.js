import {useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Profile () {
     const { user,isAuthenticated }  = useSelector(state => state.authState);

    return (
        <div className="row justify-content-around mt-5 user-info">
            
            <div className="col-12 col-md-5">
            <h1>Welcome to GUVI Portal </h1>
            </div>
            
            <div className="col-12 col-md-3">
                <Link to="/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                    Edit Profile
                </Link>
            </div>
            {isAuthenticated ?
             <div className="col-12 col-md-5">
                <h4>Full Name</h4>
                <p>{user.name}</p>
    
                <h4>Email Address</h4>
                <p>{user.email}</p>

                <h4>Joined</h4>
                <p>{String(user.createdAt).substring(0, 10)}</p>
            </div> : ""}

            {isAuthenticated && user.gender && user.mobile ? 
             <div className="col-12 col-md-5">
                <h4>Gender</h4>
                <p>{user.gender}</p>
    
                <h4>Mobile</h4>
                <p>{user.mobile}</p>

                <h4>Country</h4>
                <p>{user.country}</p>

                <h4>Designation</h4>
                <p>{user.designation}</p>

            </div> : ""}
        </div>
    )
}