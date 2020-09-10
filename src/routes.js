import React, { useState, useEffect } from 'react';
import { Route } from 'react-router'
import Navbar from './components/Navbar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { useLocation, useHistory } from "react-router-dom";
import Animes from './components/Animes';
import AnimeInfo from './components/AnimeInfo'
import SignPage from './components/SignPage';


const customTheme = createMuiTheme({
  overrides: {
    MuiButton: {
      outlined: {
        textTransform: 'none',
        color: 'white',
        padding: '3px 12px'
      },
      text: {
        textTransform: 'none'
      }
    },
  }
});

// Hook
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
  const scrolledDown = useScrollTrigger({ threshold: 50, disableHysteresis: true });
  const theme = useTheme();
  // const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const window = useWindowSize();
  const smDown = (width) => {
    if (width <= 768) {
      return true
    } else {
      return false
    }
  }


  return (
    <MuiThemeProvider theme={customTheme}>
      <div className='bg'>
        <Navbar smDown={smDown(window)} history={history} />
        <Route exact path='/' render={(props) => <SignPage {...props} smDown={smDown(window)} location={location} window={window} />} />
      </div>
    </MuiThemeProvider>
  );
}
// <Route exact path='/' render={(props) => <Animes {...props} smDown={smDown} history={history} />} />
// <Route exact path='/Anime/:animeName' render={(props) => <AnimeInfo {...props} smDown={smDown} location={location} />} />
export default Routes;
