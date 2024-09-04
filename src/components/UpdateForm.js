import React, { useState } from 'react'
import useWorkoutContext from '../hooks/useWorkoutContext';
import useAuthContext from '../hooks/useAuthContext';

const UpdateForm = ({updateData}) => {
    const { dispatch } = useWorkoutContext();
    const { user } = useAuthContext();
    const {title,reps,load} = updateData;
    const [uTitle,setUTitle] = useState(title);
    const [uReps,setUReps] = useState(reps);
    const [uLoad,setULoad] = useState(load);
    const [error,setError] = useState('');
    const [show,setShow] = useState(true);
    const [success,setSuccess] = useState(false);
    const handleSubmit=async(e)=>{
        e.preventDefault();
        var workout={title:uTitle,reps:uReps,load:uLoad};
        const response = await fetch('/workout/'+updateData._id,{
            method:'PATCH',
            body:JSON.stringify(workout),
            headers:{
                'content-type': "application/json",
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();
        if(response.ok){
            setULoad('');
            setUTitle('');
            setUReps('');
            setShow(!show);
            setTimeout(()=>{
                setSuccess(true);
                setTimeout(()=>{
                    setSuccess(false);
                    setTimeout(()=>{
                        dispatch({type:'UPDATE_WORKOUT', payload:Object.assign(updateData,workout)})
                    },200)
                },1500)
            },500)
                
        }
        if(!response.ok){
        setError(json.error);
        }
    }
  return (
   <>
   {success && (<div className="success-alert">Data Update Successful!</div>)}
   {show && <form className='create' onSubmit={handleSubmit}>
    <h3> Update Form</h3>
    <label>Title:</label>
   <input type="text" value={uTitle} onChange={(e)=>{setUTitle(e.target.value)}}/>
   <label>Reps:</label>
   <input type="text" value={uReps} onChange={(e)=>{setUReps(e.target.value)}}/>
   <label>Load:</label>
   <input type="text" value={uLoad} onChange={(e)=>{setULoad(e.target.value)}}/>
   <button type="submit">Update</button>
   {error&&<div className='error'>{error}</div>}
   </form>}
   
   </>
  )
}

export default UpdateForm