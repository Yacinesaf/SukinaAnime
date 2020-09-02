import React from 'react';
import { Route } from 'react-router'
import Navbar from './components/Navbar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { useLocation, useHistory } from "react-router-dom";
import Animes from './components/Animes';
import AnimeInfo from './components/AnimeInfo'


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




function Routes() {
  const location = useLocation();
  const history = useHistory();
  const scrolledDown = useScrollTrigger({ threshold: 50, disableHysteresis: true });
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <MuiThemeProvider theme={customTheme}>
      <div className='bg'>
        <Navbar scrolledDown={scrolledDown} smDown={smDown} location={location} history={history} />
        <Route exact path='/' render={(props) => <Animes {...props} smDown={smDown} />} history={history} />
        <Route exact path='/Anime/:animeName' render={(props) => <AnimeInfo {...props} smDown={smDown} location={location} />} />
      </div>
    </MuiThemeProvider>
  );
}

export default Routes;
