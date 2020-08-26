import React from 'react';
import { Route } from 'react-router'
import Navbar from './components/Navbar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { useLocation, useHistory } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';

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
    }
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
      <Navbar scrolledDown={scrolledDown} smDown={smDown} />
    </MuiThemeProvider>
  );
}

export default Routes;
