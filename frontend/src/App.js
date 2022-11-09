import LoginComponent from "./components/LoginComponent";
import {Routes,Route,Link} from "react-router-dom";
import RegisterComponent from "./components/RegisterComponent";
import ForgotPassword from "./components/ForgotPassword";
import {useEffect} from "react";
import axios from "axios";

function App() {
   const getCSRF =async () => {
       await axios.get('http://localhost:8000/sanctum/csrf-cookie')
   }
   useEffect(()=>{
       getCSRF();
   },[])
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<LoginComponent/>}/>
        <Route path='/register' element={<RegisterComponent/>}/>
        <Route path='/forgot' element={<ForgotPassword/>}/>
      </Routes>
    </div>
  );
}

export default App;
