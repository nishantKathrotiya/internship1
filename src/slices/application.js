import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  action:null,
  applicationID : null,
};

const applicationSlice = createSlice({
  name: "application",
  initialState: initialState,

  reducers: {
    // using reducers we can set the value of initial State;
    setApplicationID(state, value) {
      state.applicationID = value.payload;

    },
    setAction(state, value) {
      state.action = value.payload;
    },
   
    setNull(state, value) {
      state.msg = null;
      state.applicationID = null;
      state.action=null;
    },
  },
});

export const { setApplicationID, setAction  , setNull } = applicationSlice.actions;

export default applicationSlice.reducer;
