import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { setAnimes } from '../reduxStore/actions'
import '../css/animes.css'

class Searchbar extends Component {
  constructor() {
    super()
    this.state = {
      inputValue: ''
    }
  }
  search = _.debounce(function (page, value) {
    this.props.setAnimes(page, value)
  }, 100)


  render() {
    return (
      <div className='d-flex justify-content-center' style={{ paddingBottom: this.props.smDown ? 30 : 58, paddingTop: this.props.smDown ? 4 : 10 }}>
        <div className='d-flex align-items-center search' style={{ backgroundColor: 'white' }}>
          <input
            style={{ width: this.props.smDown ? '80%' : 600, border: 'none', flexGrow: 1 }}
            placeholder='Search anime'
            onChange={(e) => {
              this.setState({ inputValue: e.target.value })
              if (e.target.value.length) {
                this.search(this.props.currentPage, e.target.value)
              } else {
                this.search(1)
              }
            }}
            value={this.state.inputValue}
          />
          <svg onClick={() => { this.setState({ inputValue: '' }); this.search(1) }} width="1.5em" height="1.5em" viewBox="0 0 16 16" className={`bi bi-x-square-fill ${this.state.inputValue.length ? 'visible' : 'invisible'}`} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
          </svg>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  animesList: state.animes.animes,
  currentPage: state.animes.currentPage,
})

export default connect(mapStateToProps, { setAnimes })(Searchbar)
