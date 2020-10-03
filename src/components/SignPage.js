import React, { Component } from 'react'
import carousel1 from '../assets/lf3zl98yy7011.jpg'
import carousel2 from '../assets/shingeki-no-kyojin-poster.jpg'
import carousel3 from '../assets/poster-780.jpg'
import carousel4 from '../assets/s592.jpeg'
import carousel5 from '../assets/82553f840be22c1ecb83a07aaf2be242.jpg'
import carousel6 from '../assets/100demonslayer.jpeg'
import '../css/signPage.css'
import '../css/styles.css'
import { connect } from 'react-redux'
import { newUser, login } from '../services/apiEndpoints'

class SignPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      showSnackbar: false,
      snackMessage: 'User does not exist. Please try again',
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ email: '', password: '' });
    }
  }

  isPasswordValid = (password) => {
    const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
    return re.test(String(password)) || password === ''
  }

  isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()) || email === ''
  }

  isFormValid = () => {
    if (this.state.email === '' || this.state.password === '') {
      return false
    }
    return Boolean(this.isEmailValid(this.state.email) && this.isPasswordValid(this.state.password))
  }

  snackbar = () => {
    this.setState({ showSnackbar: true });
    setTimeout(() => {
      this.setState({ showSnackbar: false });
    }, 3000);
  }

  render() {
    let location = this.props.location.pathname.split('/')[1];

    return (
      <div className='row justify-content-center mx-0 px-0' style={{ height: '100vh', paddingTop: this.props.smDown ? 0 : 72 }}>
        <div className='col-10 col-lg-5 col-xl-4 d-flex align-items-center p-0 pr-lg-5'>
          <form style={{ width: 'inherit' }}>
            <h1 className={this.props.smDown ? 'pageName-mobile' : 'pageName'}>{location === 'Login' ? 'Log in' : 'Sign up'}</h1>
            <label htmlFor='email' className='py-3 py-md-1 field-title'>Email address</label>
            <input
              style={{ border: !this.isEmailValid(this.state.email) ? '2px solid #eb4d4b' : '2px solid transparent' }}
              onChange={(e) => { this.setState({ email: e.target.value }); this.isEmailValid(e.target.value) }}
              id='email'
              className='inputfield'
              type='text'
              value={this.state.email}
              placeholder='email@gmail.com' />
            {!this.isEmailValid(this.state.email) ? <p className='error-text pt-2'>Please enter a valid email</p> : null}
            <div className='py-2' />
            <label htmlFor='password' className='py-1 py-md-1 field-title'>Password</label>
            <input
              style={{ border: !this.isPasswordValid(this.state.password) ? '2px solid #eb4d4b' : '2px solid transparent' }}
              onChange={(e) => { this.setState({ password: e.target.value }); this.isPasswordValid(e.target.value) }}
              id='password'
              className='inputfield'
              type='password'
              value={this.state.password}
              placeholder='Password' />
            {!this.isPasswordValid(this.state.password) ? <p className='error-text pt-2'>Password must contain at least 8 characters, including one uppercase letter and a number</p> : null}
            <div onClick={() => {
              if (this.isFormValid()) {
                if (location !== 'Login') {
                  newUser(this.state.email, this.state.password)
                  this.props.history.push('/')
                }
              } else {
                login(this.state.email, this.state.password).then(() => {
                  this.props.history.push('/')
                }).catch((error) => {
                  this.snackbar()
                  this.setState({ showSnackbar: true })
                })
              }
            }} className={` mt-5 ${this.isFormValid() ? 'button' : 'button-disabled'}`}>
              {location === 'Login' ? 'Login' : 'Sign up'}
            </div>
          </form>
        </div>
        <div className='col-lg-5 col-xl-4 d-none d-lg-block pt-5 px-0'>
          <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
            {location === 'Login' ?
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
              :
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div style={{ backgroundImage: `url(${carousel4})` }} className='carousel-img' />
                </div>
                <div className="carousel-item">
                  <div style={{ backgroundImage: `url(${carousel5})` }} className='carousel-img' />
                </div>
                <div className="carousel-item">
                  <div style={{ backgroundImage: `url(${carousel6})` }} className='carousel-img' />
                </div>
              </div>
            }
          </div>
        </div>
        <div
          className={this.state.showSnackbar ? 'snackbar-show' : 'snackbar'}
          style={{ fontSize: this.props.smDown ? 12 : 16, padding: this.props.smDown ? '10px 0px' : '16' }}>
          {this.state.snackMessage}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.id
})

export default connect(mapStateToProps)(SignPage)
