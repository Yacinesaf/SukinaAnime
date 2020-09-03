import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import { connect } from 'react-redux'
import { setAnimes, setSelectedAnime } from '../reduxStore/actions'
import AnimeCard from './AnimeCard'
import { Pagination, Skeleton } from '@material-ui/lab';
import '../css/styles.css'



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
      <Grid container justify='center' style={{ padding: '60px 0px' }}>
        <Grid item xs={11}>
          <Grid container >
            {this.props.fetching ?
              Array(12).fill(0).map((x, i) => (
                <Grid key={i} item xs={12} md={3} style={{ padding: 20 }}>
                  <Skeleton style={{ borderRadius: 10 }} variant="rect" animation='wave' width={'100%'} height={300} />
                </Grid>
              ))
              :
              this.props.animesList.map(x => (
                <Grid onClick={() => { this.props.setSelectedAnime(x); this.props.history.push(`/Anime/${x.attributes.canonicalTitle}`) }} key={x.id} item xs={12} md={3} style={{ padding: 20, cursor: 'pointer' }}>
                  <AnimeCard obj={x} />
                </Grid>
              ))
            }
          </Grid>
        </Grid>
        <Grid item xs={11} style={{ paddingTop: 30, display: 'flex', justifyContent: 'center' }}>
          {this.props.fetching ?
            <Skeleton style={{ borderRadius: 2 }} variant="text" animation='wave' width={520} height={40} />
            :
            <Pagination color="secondary" page={this.state.currentPage} size={this.props.smDown ? 'small' : 'large'} showLastButton showFirstButton count={Math.ceil(Number(this.props.animeCount) / 12)}
              onChange={(event, page) => {
                this.setState({ currentPage: page })
                this.props.setAnimes(page)
              }}
            />
          }
        </Grid>
      </Grid>
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