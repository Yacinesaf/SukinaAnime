import React, { Component } from 'react'
import carousel1 from '../assets/lf3zl98yy7011.jpg'
import carousel2 from '../assets/shingeki-no-kyojin-poster.jpg'
import carousel3 from '../assets/poster-780.jpg'
import '../css/signPage.css'


export default class SignPage extends Component {
  render() {
    return (
      <div className='row justify-content-center mx-0 px-0'>
        <div className='col-xs-12 col-md-6 p-5 d-flex  align-items-center'>
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
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
