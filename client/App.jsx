import React, { useEffect } from 'react';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx'
import Settings from './components/Settings.jsx';
import Profile from './components/Profile.jsx';
import Protected from './components/Protected.jsx';
import BlackHole from './components/BlackHole.jsx';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useColorMode, Button } from '@chakra-ui/react';
import {SunIcon, MoonIcon} from '@chakra-ui/icons';
import { setUserState } from './slices/userSlice.js';
import { useGetUserProjectsQuery } from './utils/userApi.js';
import './css/index.css';
import './css/BlackHole.sass';


const App = () => {
  const dispatch = useDispatch();
  const isAuth = localStorage.getItem('isAuth');
  const { data, isSuccess } = useGetUserProjectsQuery(undefined, { skip: !isAuth }); // skip auto fetch if not authenticated
  const {colorMode, toggleColorMode} = useColorMode();
  useEffect(() => {
    if (isAuth) {
      if (isSuccess && data) {
        const userData = data;
        const projects = {}
        for (const project of userData.projects) {
          projects[project.projectName] = project;
        }
        const transformedData = {
          projects,
          numOfProjects: userData.projects.length,
          username: userData.username,
          userId: userData.userId,
        };
        dispatch(setUserState(transformedData));
      }
    }
  });
  return (
    <>
      <BlackHole />
      <div className="App">
        <Routes>
          <Route
            exact path="/"
            element={
              <Protected>
                <Home />
              </Protected>
            }>
          </Route>
          <Route
            exact path="/settings"
            element={
              <Protected>
                <Settings />
              </Protected>
            }>
          </Route>
          <Route
            exact path="/profile"
            element={
              <Protected>
                <Profile />
              </Protected>
            }>
          </Route>
          <Route
            exact path="/login"
            Component={Login}>
          </Route>
          <Route
            exact path="/signup"
            Component={SignUp}>
          </Route>
        </Routes>
        <Button onClick={toggleColorMode}
          position='absolute'
          bottom={1}
          left={1}
        >
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon/>}
        </Button>
      </div>
    </>
  );
}
export default App;
