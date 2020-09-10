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
      <div className="justify-content-center navbar">
        <div className='row col-10 col-md-11 justify-content-between mx-0 px-0 align-items-center'>
          <p className='site_name' onClick={() => { this.props.history.push('/') }}>Sukina</p>
          {this.props.isUserLogged ? <Avatar alt='avatar' /> :
            this.props.smDown ?
              <button
                onClick={() => { this.setState({ menuIsClicked: !this.state.menuIsClicked }) }}
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
        {this.props.smDown ?
          <div className={`col-10 col-md-11 mx-0 px-0 text-center menu py-2 ${this.state.menuIsClicked ? 'd-block' : 'd-none'}`}>
            <p className='menuText pb-4'>Login</p>
            <div className='divider' />
            <p className='menuText pb-4'>Sign up</p>
            <div className='divider' />
            <p className='menuText'>About us</p>
          </div>
          : null}

      </div>
    )
  }
}

export default Navbar;