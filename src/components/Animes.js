import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAnimes, setSelectedAnime } from '../reduxStore/actions'
import AnimeCard from './AnimeCard'
import { Pagination } from '@material-ui/lab';
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
        <div className='col-11 d-flex justify-content-center' style={{ paddingTop: 30 }}>

          <Pagination color="secondary" page={this.state.currentPage} size={this.props.smDown ? 'small' : 'large'} showLastButton showFirstButton count={Math.ceil(Number(this.props.animeCount) / 12)}
            onChange={(event, page) => {
              this.setState({ currentPage: page })
              this.props.setAnimes(page)
            }}
          />

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