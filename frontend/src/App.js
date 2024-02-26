import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './route/ProtectedRoute';
import UpdateProfile from './components/UpdateProfile';
import Profile from './components/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
    <div className="App">
      <HelmetProvider>
        <Header/>
        <ToastContainer theme='dark' />
          <Routes>
          <Route path='/' element={<ProtectedRoute><Profile/></ProtectedRoute>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/update' element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>}/>
          </Routes>
        <Footer/>
      </HelmetProvider>
    </div>
    </Router>
  );
}

export default App;
