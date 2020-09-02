import React, { Component } from 'react'
import { AppBar, Toolbar, Typography, Button, Grid, MenuItem, Menu, Avatar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { getAnimes } from '../services/apiEndpoints'


export default class Navbar extends Component {
  constructor() {
    super()
    this.state = {
      anchorEl: null
    }
  }

  componentDidMount() {
    getAnimes()
  }

  openMenu = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  }
  closeMenu = () => {
    this.setState({ anchorEl: null });
  }

  render() {
    return (
      <AppBar color={this.props.scrolledDown || this.props.location.pathname !== ['/'] ? 'secondary' : 'transparent'} position="sticky" style={{ boxShadow: this.props.scrolledDown ? '0 2px 6px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.13)' : 'none', transition : '0.2s ease-in' }}>
        <Grid container justify='center'>
          <Grid item xs={10} sm={11}>
            <Toolbar style={{ justifyContent: 'space-between', padding: this.props.smDown ? 0 : '10px 0px' }}>
              <Typography style={{ fontFamily: 'Fredoka One, cursive' }} variant={this.props.smDown ? 'h5' : "h4"}>Sukina</Typography>
              {this.props.isUserLogged ? <Avatar alt='avatar' /> :
                this.props.smDown ? <MenuIcon onClick={this.openMenu} /> :
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button color='inherit' style={{ marginRight: 20, fontSize: 16  }}>Login</Button>
                    <Button color='inherit' variant='outlined' style={{ color: this.props.scrolledDown || this.props.location.pathname !== ['/'] ? 'white' : '#00b248', fontSize: 16 }}>Sign up</Button>
                  </div>
              }

            </Toolbar>
          </Grid>
          <Menu
            style={{}}
            anchorEl={this.state.anchorEl}
            keepMounted
            open={Boolean(this.state.anchorEl)}
            onClose={() => { this.setState({ anchorEl: null }) }}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            elevation={4}
          >
            <MenuItem onClick={this.closeMenu}>
              <Typography>Login</Typography>
            </MenuItem>
            <MenuItem onClick={this.closeMenu}>
              <Typography>Sign up</Typography>
            </MenuItem>
          </Menu>
        </Grid>
      </AppBar>
    )
  }
}
