import React, { useState } from 'react'
import useWorkoutContext from '../hooks/useWorkoutContext';
import useAuthContext from '../hooks/useAuthContext';
const WorkoutForm = () => {
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState('');
    const { dispatch } = useWorkoutContext();
    const [emptyFields, setEmptyFields] = useState([]);
    const { user } = useAuthContext();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError('YOU MUST BE LOGGED IN!')
            return
        }
        var workout = { title, load, reps };
        const response = await fetch('/workout/', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();
        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields);
        }
        if (response.ok) {
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            setEmptyFields([]);
            console.log('New workout added', json.workout);
            //window.location.reload(true);
            dispatch({ type: 'CREATE_WORKOUT', payload: json.workout })
        }

    }
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3> Add New Workout</h3>
            <label>Exercise Title:</label>
            <input type='text' onChange={(e) => { setTitle(e.target.value) }} value={title} className={emptyFields?.includes('title') ? 'error' : ''} />
            <label>Exercise Load(in Kg):</label>
            <input type='text' onChange={(e) => { setLoad(e.target.value) }} value={load} className={emptyFields?.includes('load') ? 'error' : ''} />
            <label>Exercise Reps:</label>
            <input type='text' onChange={(e) => { setReps(e.target.value) }} value={reps} className={emptyFields?.includes('reps') ? 'error' : ''} />
            <button type='submit'>Add Exercise</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default WorkoutForm