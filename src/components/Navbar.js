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
      <div className='container-fluid px-0 mx-0'>
        <div className="row justify-content-center navbar px-0 mx-0">
          <div className='col-10 col-md-11 d-flex justify-content-between align-items-center px-0 mx-0'>
            <p className='site_name' onClick={() => { this.props.history.push('/') }}>Sukina</p>
            {this.props.isUserLogged ? <Avatar alt='avatar' /> :
              this.props.smDown ?
                <button
                  style={{ paddingTop: 5 }}
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
        </div>
        {this.props.smDown ?
          <div className={`d-flex flex-column align-items-center w-100 py-4 ${this.state.menuIsClicked ? 'menuDropped' : 'menu'}`}>
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