import { useContext } from "react";
import { AuthContainer } from "../context/AuthContext";

const useAuthContext = ()=>{
    const context = useContext(AuthContainer);
    if(!context){
        throw Error("Please use this context inside a provider")
    }
    console.log(context);
    return context;
}
export default useAuthContext;