import React, { useState } from 'react'
import useWorkoutContext from '../hooks/useWorkoutContext';
import UpdateForm from './UpdateForm';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import useAuthContext from '../hooks/useAuthContext'
const WorkoutDetails = ({ workout }) => {

  const [updateData, setUpdateData] = useState('');
  const [show, setShow] = useState(false);
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  const handleClick = async () => {
    if (!user) {
      return
    }
    const response = await fetch('/workout/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json();
    console.log(json);
    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json.workout })
    }
  }
  const handleUpdate = () => {
    setUpdateData(workout);
    setShow(!show);
  }
  return (
    <div className='workout-details'>

      <h4>{workout.title}</h4>
      <p><strong>Load(Kg):</strong>{workout.load}</p>
      <p><strong>Reps:</strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleUpdate} >edit &nbsp;&nbsp;</span>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
      {show && <UpdateForm updateData={updateData}></UpdateForm>}
    </div>
  )
}

export default WorkoutDetails