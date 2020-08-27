import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import { connect } from 'react-redux'
import { setAnimes } from '../reduxStore/actions'

class Animes extends Component {
  componentDidMount() {
    this.props.setAnimes()
  }

  render() {
    console.log(this.props.animeList);
    return (
      <Grid container justify='center'>
        <Grid item xs={11}>

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