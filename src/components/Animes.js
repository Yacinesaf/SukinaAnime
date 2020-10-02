import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAnimes, setSelectedAnime, setRelatedAnimes } from '../reduxStore/actions'
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
    window.scrollTo(0, 0)
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
                  <div className='skeleton-box' style={{ borderRadius: 7, width: '100%', height: 300 }}></div>
                </div>
              ))
              :
              this.props.animesList.map(x => (
                <div className='col-12 col-md-3'
                  onClick={() => {
                    this.props.setSelectedAnime(x)
                    this.props.history.push(`/Anime/${x.attributes.canonicalTitle}`)
                  }}
                  key={x.id}
                  style={{ padding: 20, cursor: 'pointer' }}>
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
                window.scrollTo(0, 0)
              }
            }}
            width={this.props.smDown ? '3em' : '2em'}
            height={this.props.smDown ? '3em' : '2em'}
            viewBox="0 0 16 16"
            className="bi bi-skip-backward-fill mx-md-2"
            fill={this.isFirstPage(this.state.currentPage) ? 'grey' : "white"}
            xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M.5 3.5A.5.5 0 0 0 0 4v8a.5.5 0 0 0 1 0V4a.5.5 0 0 0-.5-.5z" />
            <path d="M.904 8.697l6.363 3.692c.54.313 1.233-.066 1.233-.697V4.308c0-.63-.692-1.01-1.233-.696L.904 7.304a.802.802 0 0 0 0 1.393z" />
            <path d="M8.404 8.697l6.363 3.692c.54.313 1.233-.066 1.233-.697V4.308c0-.63-.693-1.01-1.233-.696L8.404 7.304a.802.802 0 0 0 0 1.393z" />
          </svg>
          <svg
            style={{ cursor: this.isFirstPage(this.state.currentPage) ? 'unset' : 'pointer' }}
            onClick={() => {
              if (!this.isFirstPage(this.state.currentPage)) {
                this.setState({ currentPage: this.state.currentPage - 1 });
                this.props.setAnimes(this.state.currentPage - 1)
                window.scrollTo(0, 0)
              }
            }}
            width={this.props.smDown ? '3em' : '2em'}
            height={this.props.smDown ? '3em' : '2em'}
            viewBox="0 0 16 16"
            className="bi bi-caret-left-fill ml-3 mx-md-2"
            fill={this.isFirstPage(this.state.currentPage) ? 'grey' : "white"}
            xmlns="http://www.w3.org/2000/svg">
            <path d="M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
          </svg>
          <div className='d-flex align-items-center justify-content-center mx-2  mx-md-0'>
            {this.pagination(this.state.currentPage, Math.ceil(Number(this.props.animeCount) / 12)).map((x, i) => (
              x === this.state.currentPage ?
                <div key='currentPage' className='selected white-text'>{x}</div>
                : <p onClick={(e) => { this.setState({ currentPage: parseInt(e.target.innerText) }); this.props.setAnimes(e.target.innerText); window.scrollTo(0, 0) }} className='white-text mx-3' style={{ fontSize: this.props.smDown ? 14 : 18, cursor: 'pointer' }} key={i}>{x}</p>
            ))}
          </div>
          <svg
            style={{ cursor: this.isLastPage(this.state.currentPage) ? 'unset' : 'pointer' }}
            onClick={() => {
              if (!this.isLastPage(this.state.currentPage)) {
                this.setState({ currentPage: this.state.currentPage + 1 });
                this.props.setAnimes(this.state.currentPage + 1)
                window.scrollTo(0, 0)
              }
            }}
            width={this.props.smDown ? '3em' : '2em'}
            height={this.props.smDown ? '3em' : '2em'}
            viewBox="0 0 16 16"
            className="bi bi-caret-right-fill mr-3 mx-md-2"
            fill={this.isLastPage(this.state.currentPage) ? 'grey' : "white"}
            xmlns="http://www.w3.org/2000/svg">
            <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
          </svg>
          <svg
            style={{ cursor: this.isLastPage(this.state.currentPage) ? 'unset' : 'pointer' }}
            onClick={() => {
              if (!this.isLastPage(this.state.currentPage)) {
                this.setState({ currentPage: Math.ceil(Number(this.props.animeCount) / 12) });
                this.props.setAnimes(Math.ceil(Number(this.props.animeCount) / 12))
                window.scrollTo(0, 0)
              }
            }}
            width={this.props.smDown ? '3em' : '2em'}
            height={this.props.smDown ? '3em' : '2em'}
            viewBox="0 0 16 16"
            className="bi bi-skip-forward-fill mx-md-2"
            fill={this.isLastPage(this.state.currentPage) ? 'grey' : "white"}
            xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />
            <path d="M7.596 8.697l-6.363 3.692C.693 12.702 0 12.322 0 11.692V4.308c0-.63.693-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
            <path d="M15.096 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.693-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
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
  categoryId: state.selectedAnime.categoryId
})

export default connect(mapStateToProps, { setAnimes, setSelectedAnime, setRelatedAnimes })(Animes)
