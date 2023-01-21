import LoginComponent from "./components/LoginComponent";
import {Routes,Route,Link} from "react-router-dom";
import RegisterComponent from "./components/RegisterComponent";
import ForgotPassword from "./components/ForgotPassword";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import MainLayout from "./Layots/MainLayout";
import HomeComponent from "./components/HomeComponent";
import DashboardLayout from "./Layots/DashboardLayout";
import {AuthProvider} from "./Contexts/Auth/AuthContext";
import AuthGuard from "./Services/AuthGuard";

function App() {
  return (
    <AuthProvider>
    <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route index element={<HomeComponent/>} />
            <Route path='/login' element={<LoginComponent/>}/>
            <Route path='/register' element={<RegisterComponent/>}/>
            <Route path='/forgot' element={<ForgotPassword/>}/>
            <Route  element={<AuthGuard/>}>
              <Route  element={<DashboardLayout/>}>
                <Route path='profile' element={<Profile/>}/>
                <Route path='dashboard' element={<Dashboard/>}/>
              </Route>
            </Route>

          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
