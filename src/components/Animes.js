import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import { connect } from 'react-redux'
import { setAnimes } from '../reduxStore/actions'
import AnimeCard from './AnimeCard'
import '../styles.css'
import { Pagination, Skeleton } from '@material-ui/lab';

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
      <Grid className='bg' container justify='center' style={{ padding: '60px 0px' }}>
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
                <Grid key={x.id} item xs={12} md={3} style={{ padding: 20 }}>
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
            <Pagination page={this.state.currentPage} size='large' count={Math.round(Number(this.props.animeCount) / 12)} showFirstButton showLastButton
              onChange={(event, page) => {
                this.setState({ currentPage: page })
                if (event.currentTarget.innerText) {
                  if (event.currentTarget.innerText > this.state.currentPage) {
                    this.props.setAnimes(Number(event.currentTarget.innerText), 'next')
                  } else if (event.currentTarget.innerText < this.state.currentPage) {
                    this.props.setAnimes(Number(event.currentTarget.innerText), 'prev')
                  }
                }
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
  animeCount: state.animes.totalCount
})

export default connect(mapStateToProps, { setAnimes })(Animes)