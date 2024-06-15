import {combineReducers} from "@reduxjs/toolkit";

import authReducer from "../slices/auth"  
import profileReducer from "../slices/profile"
import applicationReducer from "../slices/application";

// importing all reducer which is made into slices;



const rootReducer  = combineReducers({                  // combining all reducer;
    auth: authReducer,
    profile:profileReducer,
    application:applicationReducer
})

export default rootReducer

