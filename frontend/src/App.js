import LoginComponent from "./components/LoginComponent";
import {Routes,Route,Link} from "react-router-dom";
import RegisterComponent from "./components/RegisterComponent";
import ForgotPassword from "./components/ForgotPassword";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import MainLayout from "./Layots/MainLayout";
import HomeComponent from "./components/HomeComponent";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<HomeComponent/>} />
          <Route path='/login' element={<LoginComponent/>}/>
          <Route path='/register' element={<RegisterComponent/>}/>
          <Route path='/forgot' element={<ForgotPassword/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>

        </Route>
      </Routes>
    </div>
  );
}

export default App;
