import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/navbar.css'
import '../css/styles.css'
import { signOut } from '../reduxStore/actions'

class Navbar extends Component {
  constructor() {
    super()
    this.state = {
      menuIsClicked: false,
    }
  }


  render() {
    return (
      <div className='container-fluid px-0 mx-0'>
        <div className="row justify-content-center navbar px-0 mx-0">
          <div className='col-10 col-md-11 d-flex justify-content-between align-items-center px-0 mx-0'>
            <p className='site_name' onClick={() => { this.props.history.push('/') }}>Sukina</p>
            {this.props.user ?
              <div className='d-flex align-items-center'>
                <div className='avatar' style={{ height: this.props.smDown ? 36 : 48, width: this.props.smDown ? 36 : 48 }} />
                <div className='px-2'></div>
                <svg onClick={() => {
                  this.props.signOut()
                  this.props.history.push('/')
                }}
                  style={{ cursor: 'pointer' }}
                  width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-box-arrow-right" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                  <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                </svg>
              </div>

              :
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
                  <div onClick={() => { this.props.history.replace('/Login') }} className='login bold_text'>Login</div>
                  <div onClick={() => { this.props.history.replace('/Signup') }} className='signup bold_text'>Sign up</div>
                </div>
            }
          </div>
        </div>
        {this.props.smDown ?
          <div className={`d-flex flex-column align-items-center w-100 py-4 ${this.state.menuIsClicked ? 'menuDropped' : 'menu'}`}>
            <p onClick={() => { this.props.history.push('/Login'); this.setState({ menuIsClicked: false }) }} className='menuText pb-4'>Login</p>
            <div className='divider' />
            <p onClick={() => { this.props.history.push('/Signup'); this.setState({ menuIsClicked: false }) }} className='menuText pb-4'>Sign up</p>
            <div className='divider' />
            <p onClick={() => { this.props.history.push('/About'); this.setState({ menuIsClicked: false }) }} className='menuText'>About us</p>
          </div>
          : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.id
})

export default connect(mapStateToProps, { signOut })(Navbar);