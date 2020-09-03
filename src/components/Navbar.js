import React, { Component } from 'react'
import { AppBar, Toolbar, Typography, Button, Grid, MenuItem, Menu, Avatar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import '../css/navbar.css'

class Navbar extends Component {
  constructor() {
    super()
    this.state = {
      scrolled: false,
      menuIsClicked: false,
      anchorEl: null
    }
  }
  componentDidMount() {
    var h1 = parseInt(this.refs.header.offsetHeight);
    window.addEventListener('scroll', this._calcScroll.bind(this, h1));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._calcScroll)
  }


  _calcScroll(h1) {
    var _window = window;
    var heightDiff = parseInt(h1);
    var scrollPos = _window.scrollY;
    if (scrollPos > heightDiff - 100) {
      this.setState({
        scrolled: true,
      });
    } else {
      this.setState({
        scrolled: false,
      });
    }
  }

  openMenu = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  }
  closeMenu = () => {
    this.setState({ anchorEl: null });
  }

  render() {
    return (
      <div ref='header' className='navbar'>
        <div className="container justify-content-center" >
          <div className='row col-xs-10 col-sm-11 justify-content-between'>
            <p className='site_name' onClick={() => { this.props.history.push('/') }}>Sukina</p>
            {this.props.isUserLogged ? <Avatar alt='avatar' /> :
              this.props.smDown ? <MenuIcon onClick={this.openMenu} /> :
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className='login bold_text'>Login</div>
                  <div className='signup bold_text'>Sign up</div>
                </div>
            }
          </div>
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
        </div>
      </div>
    )
  }
}

export default Navbar;