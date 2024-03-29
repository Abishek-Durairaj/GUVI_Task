import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import thunk from 'redux-thunk';
import authReducer from './slices/authSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';


const persistConfig = {
    key: 'root',
    version:1,
    storage
  }

const reducer = combineReducers({    
    authState: authReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer
    // middleware: [thunk]
})

export default store;