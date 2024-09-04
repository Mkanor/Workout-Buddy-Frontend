import React, { createContext, useReducer } from 'react'

export const WorkoutContainer = createContext();
export const reducer =(state,action)=>{
    switch(action.type){
        case 'SET_WORKOUTS': return {workouts:action.payload}
        case 'CREATE_WORKOUT': return {workouts:[action.payload, ...state.workouts]}
        case 'DELETE_WORKOUT':return {workouts: state.workouts.filter((w)=>w._id !== action.payload._id)}
        case 'UPDATE_WORKOUT':
          for(let i=0;i<state.workouts.length;i++){
            if(action.payload._id === state.workouts[i]._id){
              state.workouts[i] = action.payload;
            }
          }
          return {workouts:state.workouts}
        default: return state;
    }
}
const WorkoutContext = ({children}) => {
    const [state,dispatch] =useReducer(reducer,{workouts:null});
  return (
    <WorkoutContainer.Provider value={{...state,dispatch}}>
        {children}
    </WorkoutContainer.Provider>
  )
}

export default WorkoutContext