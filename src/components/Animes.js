import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import { connect } from 'react-redux'
import { setAnimes } from '../reduxStore/actions'
import AnimeCard from './AnimeCard'
import '../styles.css'


class Animes extends Component {
  componentDidMount() {
    this.props.setAnimes()
  }

  render() {
    console.log(this.props.animesList);
    return (
      <Grid className='bg' container justify='center' style={{padding : '60px 0px'}}>
        <Grid item xs={11}>
          <Grid container>
            {this.props.animesList.map(x => (
              <Grid key={x.id} item xs={12} md={3} style={{ padding: 20 }}>
                <AnimeCard obj={x} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    )
  }
}


const mapStateToProps = state => ({
  animesList: state.animes.animes,
  fetching: state.animes.fetchingAnimes
})

export default connect(mapStateToProps, { setAnimes })(Animes)