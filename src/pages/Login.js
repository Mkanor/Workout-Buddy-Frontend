import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin';

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {login, isLoading, error} = useLogin();
    const handleSubmit=async(e)=>{
        e.preventDefault();
       // console.log(email,password);
       await login(email,password);
    }
  return (
    <form className="login" onSubmit={handleSubmit}>
    <label>Email</label>
    <input type='text' onChange={(e)=>{setEmail(e.target.value)}} value={email} />
    <label>Password</label>
    <input type='text' onChange={(e)=>{setPassword(e.target.value)}} value={password} />
    
    <button type='submit' disabled={isLoading}>Login</button>
    {error&& <div className="error">{error}</div>}
    </form>

  )
}

export default Login