const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser')
const User = require('./models/userModel');
const ErrorHandler = require('./utils/errorHandler');
const sendToken = require('./utils/jwt');
const jwt = require('jsonwebtoken');
const path = require('path')
const dotenv = require('dotenv');
dotenv.config({path:path.join(__dirname,"config/config.env")});


app.use(express.json());
app.use(cookieParser());


//Register User - /api/v1/register
app.post('/api/v1/register',async (req, res, next) => {
    const {name, email, password } = req.body

    const user = await User.create({
        name,
        email,
        password,
    
    });

    sendToken(user, 201, res)

})

//Login User - /api/v1/login
app.post('/api/v1/login', async (req, res, next) => {
    const {email, password} =  req.body

     if(!email || !password) {
         return next(new ErrorHandler('Please enter email & password', 400))
     }

    //finding the user database
    const user = await User.findOne({email}).select('+password');

    if(!user) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }
    
    if(!await user.isValidPassword(password)){
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    sendToken(user, 201, res)
    
})

//Logout - /api/v1/logout
app.get('/api/v1/logout', async (req, res, next) => { 
    res.cookie('token',null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    .status(200)
    .json({
        success: true,
        message: "Loggedout"
    })

})

//Update Profile - /api/v1/update
app.put('/api/v1/update',async (req, res, next) => {
    //getting user ID
    const { token  }  = req.cookies;
   
    if( !token ){
         return next(new ErrorHandler('Login first to handle this resource', 401))
    }
 
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)


    let newUserData = {
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        mobile: req.body.mobile,
        country: req.body.country,
        designation: req.body.designation,
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
    })

    res.status(200).json({
        success: true,
        user
    })

})

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}

app.use(errorMiddleware)

module.exports = app;