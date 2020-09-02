import React, { Component } from 'react'
import { Grid, Dialog } from '@material-ui/core'
import { connect } from 'react-redux'
import { setSelectedAnimeByFetch } from '../reduxStore/actions'
import loadingState from '../assets/loading.svg'
import '../styles.css'


class AnimeInfo extends Component {
  constructor() {
    super()
    this.state = {
      isDialogOpen: false
    }
  }

  componentDidMount() {
    let name = this.props.location.pathname.split('/')
    if (!this.props.anime) {
      this.props.setSelectedAnimeByFetch(name[name.length - 1])
    }
  }


  render() {
    console.log(this.props.anime);
    return (
      <div>
        {this.props.anime ?
          <Grid container justify='center'>
            <Grid item xs={12}>
              <div onClick={() => {this.setState({isDialogOpen : true}) }} style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: `url(${this.props.anime.attributes.coverImage.original})`,
                width: '100%',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: 400,
                cursor: 'pointer'
              }}>
                <div className="player"><span>Play</span></div>
              </div>
            </Grid>
            <Dialog style={{borderRadius : 'none !important'}} maxWidth={false} onClose={() => { this.setState({ isDialogOpen: false }) }} open={this.state.isDialogOpen}>
              <iframe title='trialer' id="ytplayer" type="text/html" width="640" height="360"
                src={`https://www.youtube.com/embed/${this.props.anime.attributes.youtubeVideoId}`}
                frameBorder="0"></iframe>
            </Dialog>
          </Grid>
          :
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img alt='loading' src={loadingState} style={{ transform: 'scale(0.6)' }} />
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  anime: state.selectedAnime.selectedAnime,
})

export default connect(mapStateToProps, { setSelectedAnimeByFetch })(AnimeInfo)

// }