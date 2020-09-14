import React, { Component } from 'react'
import carousel1 from '../assets/lf3zl98yy7011.jpg'
import carousel2 from '../assets/shingeki-no-kyojin-poster.jpg'
import carousel3 from '../assets/poster-780.jpg'
import '../css/signPage.css'
import '../css/styles.css'
import { connect } from 'react-redux'

class SignPage extends Component {
  constructor() {
    super()
    this.state = {
      email: null,
      password: null
    }
  }

  isPasswordValid = (password) => {
    const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
    return re.test(String(password)) || password === null
  }

  isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()) || email === null
  }

  isFormValid = () => {
    if (this.state.email === null && this.state.password === null) {
      return false
    }
    return Boolean(this.isEmailValid(this.state.email) && this.isPasswordValid(this.state.password))
  }

  render() {
    console.log(this.isEmailValid(this.state.email));
    return (
      <div className='row justify-content-center mx-0 px-0' style={{ height: this.props.smDown ? '100vh' : 'unset', paddingTop: this.props.smDown ? 0 : 72 }}>
        <div className='col-10 col-lg-5 col-xl-4 d-flex align-items-center p-0 pr-lg-5'>
          <form style={{ width: 'inherit' }}>
            <label htmlFor='email' className='py-3 py-md-3 field-title'>Email adress</label>
            <input
              style={{ border: !this.isEmailValid(this.state.email) ? '2px solid #eb4d4b' : '2px solid transparent' }}
              onChange={(e) => { this.setState({ email: e.target.value }); this.isEmailValid(e.target.value) }}
              id='email'
              className='inputfield'
              type='text'
              placeholder='Enter Email' />
            {!this.isEmailValid(this.state.email) ? <p className='error-text pt-2'>Please enter a valid email</p> : null}
            <label htmlFor='password' className='py-3 py-md-3 field-title'>Password</label>
            <input
              style={{ border: !this.isPasswordValid(this.state.password) ? '2px solid #eb4d4b' : '2px solid transparent' }}
              onChange={(e) => { this.setState({ password: e.target.value }); this.isPasswordValid(e.target.value) }}
              id='password'
              className='inputfield'
              type='password'
              placeholder='Password' />
            {!this.isPasswordValid(this.state.password) ? <p className='error-text pt-2'>Password must contain at least 8 characters, including one uppercase letter and a number</p> : null}
            <div className={` mt-5 ${this.isFormValid() ? 'button' : 'button-disabled'}`}>
              {this.props.location.pathname === 'login' ? 'Login' : 'Sign up'}
            </div>
          </form>
        </div>
        <div className='col-lg-5 col-xl-4 d-none d-lg-block p-0'>
          <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div style={{ backgroundImage: `url(${carousel1})` }} className='carousel-img' />
              </div>
              <div className="carousel-item">
                <div style={{ backgroundImage: `url(${carousel2})` }} className='carousel-img' />
              </div>
              <div className="carousel-item">
                <div style={{ backgroundImage: `url(${carousel3})` }} className='carousel-img' />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(SignPage)
