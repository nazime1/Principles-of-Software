import {createSlice} from '@reduxjs/toolkit'

interface BranchTypeInitialStateType {
  curVal: string
}

const initialState: BranchTypeInitialStateType = {
  curVal: 'trueBranch',
}

const branchTypeSlice = createSlice({
  name: "branchTypeSlice",
  initialState, 
  reducers: {
    setTrue: (state) => {
      state.curVal = "trueBranch"
    },
    setFalse: (state) => {
      state.curVal = "falseBranch"
    },
  }, 
})

export const branchTypeServices = {
  actions: branchTypeSlice.actions, 
}

const branchTypeReducer = branchTypeSlice.reducer;
export default branchTypeReducer;