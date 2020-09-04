import React, { Component } from 'react'
import { Avatar } from '@material-ui/core';
import '../css/navbar.css'
import '../css/styles.css'

class Navbar extends Component {
  constructor() {
    super()
    this.state = {
      menuIsClicked: false,
      anchorEl: null
    }
  }


  render() {
    return (
      <div className="justify-content-center navbar" >
        <div className='row col-xs-10 col-sm-11 justify-content-between mx-0 px-0'>
          <p className='site_name' onClick={() => { this.props.history.push('/') }}>Sukina</p>
          {this.props.isUserLogged ? <Avatar alt='avatar' /> :
            this.props.smDown ?
              <button
                className={this.state.menuIsClicked ? "hamburger hamburger--spin is-active menubtn" : "hamburger hamburger--spin menubtn"}
                type="button">
                <span className="hamburger-box">
                  <span className="hamburger-inner" />
                </span>
              </button>
              :
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className='login bold_text'>Login</div>
                <div className='signup bold_text'>Sign up</div>
              </div>
          }
        </div>
      </div>
    )
  }
}

export default Navbar;