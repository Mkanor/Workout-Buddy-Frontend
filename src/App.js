import './App.css';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import Home from './Home';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import useAuthContext from './hooks/useAuthContext';

function App() {
  const {user} = useAuthContext();
  return (
    <div >
      <BrowserRouter>
      <NavBar/>
          <div className="pages">
            <Routes>
              <Route path='/' element={user
                ?<Home/>
                :<Navigate to='/login'></Navigate>
                }></Route>
              <Route path='/login' element={!user
                ?<Login/>
                :<Navigate to='/'></Navigate>
              }></Route>
              <Route path='/signup' element={!user
                ?<Signup/>
                :<Navigate to='/'></Navigate>
              }></Route>            </Routes>
          </div>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
