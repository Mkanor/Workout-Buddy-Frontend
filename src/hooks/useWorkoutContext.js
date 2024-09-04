import { useContext } from "react";
import { WorkoutContainer } from "../context/WorkoutContext";

const useWorkoutContext = ()=>{
    const context = useContext(WorkoutContainer);
    if(!context){
        throw Error("Please use this context inside a provider")
    }
    return context;
}
export default useWorkoutContext;
