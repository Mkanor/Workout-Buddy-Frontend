import React, { createContext, useEffect, useReducer } from 'react'

export const AuthContainer = createContext();

export const Authreducer =(state,action)=>{
    switch(action.type){
        case 'LOGIN': return {user: action.payload}
        case 'LOGOUT': return {user:null}
        default: return state;
    }
    
}

const AuthContext = ({children}) => {
  
    const [state,dispatch] =useReducer(Authreducer,{user:null});
    useEffect(()=>{
      const user = JSON.parse(localStorage.getItem('user'))
      if(user){
        dispatch({type:'LOGIN',payload:user})
      }
    },[])
  return (
    <AuthContainer.Provider value={{...state,dispatch}}>
        {children}
    </AuthContainer.Provider>
  )
}

export default AuthContext