import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { logout } from '../actions/userActions';


export default function Header () {
     const { isAuthenticated, user } = useSelector(state => state.authState);
    
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const logoutHandler = () => {
      dispatch(logout);
     }


    return (
    <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
              <img width="65px" alt='GUVI Logo' src="/GUVI.png" />
            </div>
        </div>
  
  
        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
           { isAuthenticated ? 
            
            <Link to="/login" onClick={logoutHandler}  className="btn" id="logout_btn">Logout</Link>
          : 
            <Link to="/login"  className="btn" id="login_btn">Login</Link>
           }
        </div>
    </nav>
    )
}