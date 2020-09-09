import React, { Component } from 'react'
import carousel1 from '../assets/lf3zl98yy7011.jpg'
import carousel2 from '../assets/shingeki-no-kyojin-poster.jpg'
import carousel3 from '../assets/poster-780.jpg'
import '../css/signPage.css'
import '../css/styles.css'


export default class SignPage extends Component {
  constructor() {
    super()
    this.state = {
    }
  }
  render() {
    return (
      <div className='row justify-content-center mx-0 px-0' style={{height : this.props.smDown ? '100vh' : 'unset'}}>
        <div className='col-10 col-md-6 d-flex align-items-center' style={{ padding: this.props.smDown ? 0 : '0px 100px' }}>
          <form style={{ width: 'inherit' }}>
            <label htmlFor='email' className='py-1 py-md-3 field-title'>Email adress</label>
            <input id='email' className='inputfield' type='text' placeholder='Enter Email' />
            <label htmlFor='password' className='py-1 py-md-3 field-title'>Password</label>
            <input id='password' className='inputfield mb-2 mb-md-4' type='password' placeholder='Password' />
            <div className='button mt-4'>
              {this.props.location.pathname === 'login' ? 'Login' : 'Sign up'}
            </div>
          </form>
        </div>
        <div className='col-md-6 d-none d-md-block p-0'>
          <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className='carousel-img' style={{ backgroundImage: `url(${carousel1})` }} />
              </div>
              <div className="carousel-item">
                <div className='carousel-img' style={{ backgroundImage: `url(${carousel2})` }} />
              </div>
              <div className="carousel-item">
                <div className='carousel-img' style={{ backgroundImage: `url(${carousel3})` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
