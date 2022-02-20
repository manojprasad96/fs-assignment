import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import AppContext from './context/AppContext';
import { history, } from "./utils/history";
import {ROLE_ADMIN} from './utils/constant';
import { clearMessage } from "./actions/message";
import Navbar from './pages/navbar';
import Home from './pages/home/Home';
import Settings from './pages/settings/Settings';
import Login from './pages/login/Login';
import SignUp from './pages/login/Signup';
import Logout from './pages/logout/Logout';
import UserProfile from './pages/user-profile/UserProfile';

function App() {
    const { user: currentUser } = useSelector((state) => state.auth);
    const admin = (currentUser?.roles.indexOf(ROLE_ADMIN) !== -1);   
    const [title, setTitle] = useState("");
    const dispatch = useDispatch();
    
    useEffect(() => {
        history.listen((location) => {
          dispatch(clearMessage());
        });
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem("title", title);
    }, [title]);
  
    const getTitle = () => {
        return title || localStorage.getItem("title");  
    }
  
    const userSettings = {
        title: getTitle(),
        admin: admin,
        user: currentUser,
        setTitle,
    }

    return (
        <AppContext.Provider value={userSettings}>
            <Router history={history}>
                {currentUser && <Navbar/>}
                <Switch>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/signup">
                        <SignUp />
                    </Route>
                    <Route exact path={["/", "/home"]}>
                        <Home/>
                    </Route>
                    { admin && (<Route path='/settings'>
                        <Settings/>
                    </Route>)}
                    <Route path='/profile'>
                        <UserProfile/>
                    </Route>
                    <Route path='/logout'>
                        <Logout/>
                    </Route>
                </Switch>
            </Router>
        </AppContext.Provider>
    );
}

export default App;
