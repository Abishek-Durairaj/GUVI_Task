import {useEffect, useState} from 'react';
 import {useDispatch, useSelector } from 'react-redux'
 import { register, clearAuthError,registerClear } from '../actions/userActions'
 import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [ password, setPassword] = useState("")
    const [ conPassword, setConPassword] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated,registeredIn } = useSelector(state => state.authState)


    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== conPassword){
            toast("Passwords did not match", {
                position: "bottom-center",
                type: 'error',
             })
             return
            }
            dispatch(register(name,email, password))
        }
        

    useEffect(()=>{
        if(isAuthenticated) {
            if(registeredIn) {
                toast("Successfully registered", {
                    position: "bottom-center",
                    type: 'success',
                    onOpen: ()=> { dispatch(registerClear) }
                })            
            }
            navigate('/');
            return
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
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
            <form onSubmit={submitHandler} className="shadow-lg" >
                <h1 className="mb-3">Register</h1>

            <div className="form-group">
                <label htmlFor="email_field">Name</label>
                <input name='name' onChange={e =>setName(e.target.value)} value={name} type="name" id="name_field" className="form-control" />
            </div>

                <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input
                    type="email"
                    id="email_field"
                    name='email' 
                    value={email}
                    onChange={e =>setEmail(e.target.value)}
                    className="form-control"
                />
                </div>
    
                <div className="form-group">
                <label htmlFor="password_field">Password</label>
                <input
                    name='password' 
                    value={password}
                    onChange={e =>setPassword(e.target.value)}
                    type="password"
                    id="password_field"
                    className="form-control"
                  
                />
                </div>

                <div className="form-group">
                <label htmlFor="password_field">Confirm Password</label>
                <input
                    name='conPassword' 
                    value={conPassword}
                    onChange={e =>setConPassword(e.target.value)}
                    type="password"
                    id="password_field"
                    className="form-control"
                  
                />
                </div>
    
                <button
                id="register_button"
                type="submit"
                className="btn btn-block py-3"
                // disabled={loading}
                >
                REGISTER
                </button>
            </form>
            </div>
        </div>
    )
}