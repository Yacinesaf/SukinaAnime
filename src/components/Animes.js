import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAnimes, setSelectedAnime } from '../reduxStore/actions'
import AnimeCard from './AnimeCard'
import '../css/styles.css'
import '../css/animes.css'



class Animes extends Component {
  constructor() {
    super()
    this.state = {
      currentPage: 1
    }
  }
  componentDidMount() {
    this.props.setAnimes()
  }

  pagination = (page, lastPage) => {
    let arr = [page];
    if (page - 1 > 0) {
      arr.unshift(page - 1)
    }
    if (page - 2 > 0) {
      arr.unshift(page - 2)
    }
    let remainingElementslength = arr.length
    for (let i = 1; i <= 5 - remainingElementslength; i++) {
      if (page + i <= lastPage) {
        arr.push(page + i)
      }
    }
    if (arr.length < 5) {
      let remaining = arr.length
      for (let i = 1; i <= 5 - remaining; i++) {
        if (arr[0] - i > 0) {
          arr.unshift(arr[0] - 1)
        }
      }
    }
    return arr
  }

  isFirstPage = (currentPage) => {
    if (currentPage === 1) {
      return true
    } else {
      return false
    }
  }

  isLastPage = (currentPage) => {
    if (currentPage === Math.ceil(Number(this.props.animeCount) / 12)) {
      return true
    } else {
      return false
    }
  }

  render() {
    return (
      <div className='row justify-content-center mx-0 px-0' style={{ padding: '130px 0px 60px' }}>
        <div className='col-12 col-md-11' style={{ margin: '0px -5px' }}>
          <div className='row justify-content-center'>
            {this.props.fetching ?
              Array(12).fill(0).map((x, i) => (
                <div className='col-12 col-md-3' key={i} style={{ padding: 20 }}>
                  <div className='skeleton-box' style={{ borderRadius: 7, width: '100%', height: 300 }} />
                </div>
              ))
              :
              this.props.animesList.map(x => (
                <div className='col-12 col-md-3' onClick={() => { this.props.setSelectedAnime(x); this.props.history.push(`/Anime/${x.attributes.canonicalTitle}`) }} key={x.id} style={{ padding: 20, cursor: 'pointer' }}>
                  <AnimeCard obj={x} />
                </div>
              ))
            }
          </div>
        </div>
        <div className='col-11 d-flex justify-content-center align-items-center' style={{ paddingTop: 30 }}>
          <svg
            style={{ cursor: this.isFirstPage(this.state.currentPage) ? 'unset' : 'pointer' }}
            onClick={() => {
              if (!this.isFirstPage(this.state.currentPage)) {
                this.setState({ currentPage: 1 });
                this.props.setAnimes(1)
              }
            }}
            width="2em"
            height="2em"
            viewBox="0 0 16 16"
            className="bi bi-arrow-bar-left mx-2"
            fill={this.isFirstPage(this.state.currentPage) ? 'grey' : "white"}
            xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5zM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5z" />
          </svg>
          <svg
            style={{ cursor: this.isFirstPage(this.state.currentPage) ? 'unset' : 'pointer' }}
            onClick={() => {
              if (!this.isFirstPage(this.state.currentPage)) {
                this.setState({ currentPage: this.state.currentPage - 1 });
                this.props.setAnimes(this.state.currentPage - 1)
              }
            }}
            width="2em"
            height="2em"
            viewBox="0 0 16 16"
            className="bi bi-arrow-left-short mx-2"
            fill={this.isFirstPage(this.state.currentPage) ? 'grey' : "white"}
            xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
          </svg>
          <div className='d-flex align-items-center justify-content-center'>
            {this.pagination(this.state.currentPage, Math.ceil(Number(this.props.animeCount) / 12)).map((x, i) => (
              x === this.state.currentPage ?
                <div key='currentPage' className='selected white-text'>{x}</div>
                : <p onClick={(e) => { this.setState({ currentPage: parseInt(e.target.innerText) }); this.props.setAnimes(e.target.innerText) }} className='white-text mx-3' style={{ fontSize: 18, cursor: 'pointer' }} key={i}>{x}</p>
            ))}
          </div>
          <svg
            style={{ cursor: this.isLastPage(this.state.currentPage) ? 'unset' : 'pointer' }}
            onClick={() => {
              if (!this.isLastPage(this.state.currentPage)) {
                this.setState({ currentPage: this.state.currentPage + 1 });
                this.props.setAnimes(this.state.currentPage + 1)
              }
            }}
            width="2em"
            height="2em"
            viewBox="0 0 16 16"
            className="bi bi-arrow-right-short mx-2"
            fill={this.isLastPage(this.state.currentPage) ? 'grey' : "white"}
            xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
          </svg>
          <svg
            style={{ cursor: this.isLastPage(this.state.currentPage) ? 'unset' : 'pointer' }}
            onClick={() => {
              if (!this.isLastPage(this.state.currentPage)) {
                this.setState({ currentPage: Math.ceil(Number(this.props.animeCount) / 12) });
                this.props.setAnimes(Math.ceil(Number(this.props.animeCount) / 12))
              }
            }}
            width="2em"
            height="2em"
            viewBox="0 0 16 16"
            className="bi bi-arrow-bar-right mx-2"
            fill={this.isLastPage(this.state.currentPage) ? 'grey' : "white"}
            xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z" />
          </svg>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  animesList: state.animes.animes,
  fetching: state.animes.fetchingAnimes,
  animeCount: state.animes.totalCount,
  sa: state.selectedAnime.selectedAnime
})

export default connect(mapStateToProps, { setAnimes, setSelectedAnime })(Animes)
