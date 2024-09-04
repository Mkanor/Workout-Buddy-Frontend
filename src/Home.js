import React, { useEffect } from 'react'
import WorkoutDetails from './components/WorkoutDetails';
import './index.css';
import WorkoutForm from './components/WorkoutForm';
import useWorkoutContext from './hooks/useWorkoutContext'
import useAuthContext from './hooks/useAuthContext';
const Home = () => {
    //const [workouts,setWorkouts] = useState(null);
    const {workouts,dispatch} = useWorkoutContext();
    const {user} = useAuthContext()
    useEffect(()=>{
        const fetchWorkouts=async()=>{
            const response = await fetch('/workout/',{
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            });
            //console.log(await response.text())
            const json = await response.json();
            
            if(response.ok){
                dispatch({type:'SET_WORKOUTS',payload:json.workouts});//array of workout objects from controller
            }
        }
        if(user){
            fetchWorkouts();
        }
    },[dispatch,user]);
  return (
    <div className='home'>
        <div className='workouts'>
            {workouts && workouts.map((workout)=>{
                return (
                   <WorkoutDetails key={workout._id} workout={workout}/>
                )
            })}
        </div>
        <WorkoutForm/>
    </div>
  )
}

export default Home