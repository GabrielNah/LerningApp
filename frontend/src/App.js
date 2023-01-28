import LoginComponent from "./components/LoginComponent";
import {Routes,Route} from "react-router-dom";
import RegisterComponent from "./components/RegisterComponent";
import ForgotPassword from "./components/ForgotPassword";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import MainLayout from "./Layots/MainLayout";
import HomeComponent from "./components/HomeComponent";
import DashboardLayout from "./Layots/DashboardLayout";
import {AuthProvider} from "./Contexts/Auth/AuthContext";
import AuthGuard from "./Services/AuthGuard";
import GuestGard from "./Services/GuestGard";
import PostCreator from "./components/PostCreator";
import SinglePost from "./components/SinglePost";
import OtherUsers from "./components/OtherUsers";
import OtherUser from "./components/OtherUser";
import FriendRequests from "./components/FriendRequests";

function App() {
  return (
    <AuthProvider>
    <div className="App">
        <Routes>

          <Route path="/" element={<MainLayout/>}>
            <Route element={<GuestGard/>}>
              <Route path='' element={<HomeComponent/>} />
              <Route path='/login' element={<LoginComponent/>}/>
              <Route path='/register' element={<RegisterComponent/>}/>
              <Route path='/forgot' element={<ForgotPassword/>}/>
            </Route>
            <Route  element={<AuthGuard/>}>
              <Route  element={<DashboardLayout/>}>
                <Route path='profile' element={<Profile/>}/>
                <Route path='dashboard' element={<Dashboard/>}/>
                <Route path='posts' element={<PostCreator/>}/>
                <Route path='users' element={<OtherUsers/>}/>
                <Route path='requests' element={<FriendRequests/>}/>
                <Route path='users/:id' element={<OtherUser/>}/>
                <Route path='posts/:id' element={<SinglePost/>}/>
              </Route>
            </Route>
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
