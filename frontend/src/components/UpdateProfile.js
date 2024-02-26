import { useEffect, useState } from "react";
 import { useDispatch, useSelector } from "react-redux"
 import { toast } from "react-toastify";
 import {countries} from 'countries-list'
 import { updateProfile, clearAuthError } from "../actions/userActions";
 import { clearUpdateProfile } from "../slices/authSlice";
 import { useNavigate } from 'react-router-dom';

export default function UpdateProfile () {
     const {  error, user, isUpdated } = useSelector(state => state.authState);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [mobile, setMobile] = useState("");
    const [country, setCountry] = useState("");
    const [designation, setDesignation] = useState("");
    const countryList =  Object.values(countries);
    const navigate = useNavigate();

     const dispatch = useDispatch();

    

    const submitHandler  = (e) =>{
        e.preventDefault();
        if(!name || !email || !gender || !mobile || !country || !designation){
            toast("Please enter the required details", {
                position: "bottom-center",
                type: 'error',
             })
             return
            }
         dispatch(updateProfile(name,email,gender,mobile,country,designation))
    }

    useEffect(() => {
        if(user) {
            setName(user.name);
            setEmail(user.email);
        }
        if(user && user.gender && user.mobile) {
            setGender(user.gender);
            setMobile(user.mobile);
            setCountry(user.country);
            setDesignation(user.designation);
        }

        if(isUpdated) {
            toast('Profile updated successfully',{
                type: 'success',
                position: "bottom-center",
                onOpen: () => dispatch(clearUpdateProfile())
            })
            navigate('/');
            return;
        }
        
        if(error)  {
            toast(error, {
                position: "bottom-center",
                type: 'error',
                onOpen: ()=> { dispatch(clearAuthError) }
            })
            return
        }
    },[user, isUpdated, error, dispatch])

    return (  
    <div className="row wrapper">
        <div className="col-10 col-lg-5">
            <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                <h1 className="mt-2 mb-5">Update Profile</h1>

                            <div className="form-group">
                                <label htmlFor="email_field">Name</label>
                                <input 
                                    type="name" 
                                    id="name_field" 
                                    className="form-control"
                                    name='name'
                                    value={name}
                                    onChange={e=>setName(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email_field">Email</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    name='email'
                                    value={email}
                                    onChange={e=>setEmail(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="gender_field">Gender</label>
                                <input
                                    type="text"
                                    id="gender_field"
                                    className="form-control"
                                    name='gender'
                                    value={gender}
                                    onChange={e=>setGender(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="mobile_field">Mobile</label>
                                <input
                                    type="number"
                                    id="mobile_field"
                                    className="form-control"
                                    name='mobile'
                                    value={mobile}
                                    onChange={e=>setMobile(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="country_field">Country</label>
                                <select
                                    id="country_field"
                                    className="form-control"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    required

                                >{ countryList.map((country, i) => (

                                    <option key={i} value={country.name}>
                                        {country.name}
                                    </option>
                                ))
                                }
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="designation_field">Designation</label>
                                <input
                                    type="text"
                                    id="designation_field"
                                    className="form-control"
                                    name='designation'
                                    value={designation}
                                    onChange={e=>setDesignation(e.target.value)}
                                />
                            </div>

                <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
            </form>
        </div>
    </div>)
}