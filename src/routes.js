import React, { useState, useEffect } from 'react';
import { Route } from 'react-router'
import Navbar from './components/Navbar';
import { useLocation, useHistory } from "react-router-dom";
import Animes from './components/Animes';
import store from './reduxStore/store'
import AnimeInfo from './components/AnimeInfo'
import SignPage from './components/SignPage';
import firebase from 'firebase'
require('firebase/auth')


function useWindowSize() {
  const [windowWidth, setWindowWidth] = useState(undefined);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
}




function Routes() {
  const location = useLocation();
  const history = useHistory();
  const window = useWindowSize();
  const smDown = (width) => {
    if (width <= 768) {
      return true
    } else {
      return false
    }
  }

   const singPageSwitch = () => {
    return true
  }

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      store.dispatch({ type: 'SET_ID', payload: user.uid })
      store.dispatch({ type: 'SET_EMAIL', payload: user.email })
    } else {
      store.dispatch({ type: 'SET_ID', payload: null})
    }
  });
  return (
    <div className='bg'>
      {<Navbar smDown={smDown(window)} history={history} singPageSwitch={singPageSwitch()} />}
      <Route exact path='/' render={(props) => <Animes {...props} smDown={smDown(window)} history={history} />} />
      <Route exact path='/Anime/:animeName' render={(props) => <AnimeInfo {...props} smDown={smDown(window)} history={history} location={location} />} />
      <Route exact path='/:signAction' render={(props) => <SignPage {...props} smDown={smDown(window)} location={location} history={history} />} />
    </div>
  );
}

export default Routes;
