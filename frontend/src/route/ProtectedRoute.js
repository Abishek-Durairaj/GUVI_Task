import { useSelector } from 'react-redux';
import {Navigate} from 'react-router-dom';
import Loader from '../components/Loader';

export default function ProtectedRoute ({children}) {
     const { isAuthenticated, loading } = useSelector(state => state.authState)

     if(!isAuthenticated ) {
         return <Navigate to="/login" />
     }

    if(isAuthenticated) {
        return children;
    }


    //  if(loading) {
    //      return <Loader/>
    //  }

   
}