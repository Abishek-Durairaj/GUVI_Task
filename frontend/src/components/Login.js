import {Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError,loginClear,logoutClear, login } from '../actions/userActions';
// import MetaData from '../layouts/MetaData';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
 export default function Login() {
    const [email, setEmail] = useState("")
    const [ password, setPassword] = useState("")
     const dispatch = useDispatch();
     const navigate = useNavigate();

     const { loading, error, isAuthenticated,loggedIn,loggedOut } = useSelector(state => state.authState)
     const redirect = '/';

    const  submitHandler = (e) => {
        e.preventDefault();
         dispatch(login(email, password))
    }

    useEffect(() => {
        if(loggedIn) {
            toast("Successfully Loggedin", {
                position: "bottom-center",
                type: 'success',
                onOpen: ()=> { dispatch(loginClear) }
            })            
        }
        if(loggedOut) {
            toast("Loggedout !", {
                position: "bottom-center",
                type: 'warn',
                onOpen: ()=> { dispatch(logoutClear) }
            })            
        }
        if(isAuthenticated) {
            navigate(redirect)
        }
        

        if(error)  {
            toast(error, {
                position: "bottom-center",
                type: 'error',
                onOpen: ()=> { dispatch(clearAuthError) }
            })
            return
        }
    },[error, isAuthenticated, dispatch, navigate])

    return (
        <Fragment>
            {/* <MetaData title={`Login`} /> */}
            <div className="row wrapper"> 
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg">
                        <h1 className="mb-3">Login</h1>
                        <div className="form-group">
                        <label htmlFor="email_field">Email</label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            value={email}
                            onChange={e =>setEmail(e.target.value)}
                        />
                        </div>
            
                        <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            value={password}
                            onChange={e =>setPassword(e.target.value)}
                        />
                        </div>
            
                        <button
                        id="login_button"
                        type="submit"
                        className="btn btn-block py-3"
                        >
                        LOGIN
                        </button>

                        <Link to="/register" className="float-right register-font mt-3 ">New User?</Link>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}