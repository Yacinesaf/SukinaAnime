import React, { Component } from 'react'
import { AppBar, Toolbar, Typography, Button, } from '@material-ui/core';

export default class Navbar extends Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Sukina
          </Typography>
          <Button>Login</Button>
          <Button>Signup</Button>
        </Toolbar>
      </AppBar>
    )
  }
}
