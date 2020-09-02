import React, { Component } from 'react'
import { Grid, Dialog, Typography, Paper } from '@material-ui/core'
import { connect } from 'react-redux'
import { setSelectedAnimeByFetch } from '../reduxStore/actions'
import loadingState from '../assets/loading.svg'
import '../styles.css'
import GradeIcon from '@material-ui/icons/Grade';
import placeHolder from '../assets/noImageHolder.jpg'

class AnimeInfo extends Component {
  componentDidMount() {
    let name = this.props.location.pathname.split('/')
    if (!this.props.anime) {
      this.props.setSelectedAnimeByFetch(name[name.length - 1])
    }
  }

  rateToFive = (rate) => {
    return (rate / 20).toFixed(2)
  }

  render() {
    console.log(this.props.anime);
    return (
      <div>
        {this.props.anime ?
          <Grid container justify='center'>
            <Grid item xs={12}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: this.props.anime.attributes.coverImage ? `url(${this.props.anime.attributes.coverImage.original})` : `url(${placeHolder})`,
                width: '100%',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: 350,
                boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
              }} />
            </Grid>
            <Grid item style={{ position: 'relative', display: 'flex', paddingTop: 30 }} xs={11}>
              <Grid container justify='center'>
                <Grid item xs={2} style={{ transform: 'translateY(-120px)' }}>
                  <img alt='poster' src={this.props.anime.attributes.posterImage.small} style={{ boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)' }} />
                  <div style={{ padding: '30px 0px' }}>
                    <Typography style={{ padding: '10px 0px', borderBottom: '1px solid grey' }} variant='h6'><strong>Episodes :</strong> {this.props.anime.attributes.episodeCount}</Typography>
                    <Typography style={{ padding: '10px 0px', borderBottom: '1px solid grey' }} variant='h6'><strong>Episodes duration :</strong> {this.props.anime.attributes.episodeLength} min</Typography>
                    <Typography style={{ padding: '10px 0px', borderBottom: '1px solid grey' }} variant='h6'><strong>Status :</strong> {this.props.anime.attributes.status}</Typography>
                    <Typography style={{ padding: '10px 0px', borderBottom: '1px solid grey' }} variant='h6'><strong>Rating Rank :</strong> {this.props.anime.attributes.ratingRank}</Typography>
                    <Typography style={{ padding: '10px 0px', borderBottom: '1px solid grey' }} variant='h6'><strong>Start date :</strong> {this.props.anime.attributes.startDate}</Typography>
                    <Typography style={{ padding: '10px 0px', borderBottom: '1px solid grey' }} variant='h6'><strong>End date :</strong> {this.props.anime.attributes.endDate ? this.props.anime.attributes.endDate : 'Not finished/Dropped'}</Typography>
                    <Typography style={{ padding: '10px 0px', borderBottom: '1px solid grey' }} variant='h6'><strong>Show Type :</strong> {this.props.anime.attributes.showType}</Typography>
                    <Typography style={{ padding: '10px 0px' }} variant='h6'><strong>Age Rating :</strong> {this.props.anime.attributes.ageRatingGuide ? this.props.anime.attributes.ageRatingGuide : this.props.anime.attributes.ageRating}</Typography>
                    {this.props.anime.attributes.nsfw ? <Typography variant='h6' style={{ fontWeight: 600 }}>NSFW</Typography> : null}
                  </div>
                </Grid>
                <Grid item xs={10} style={{ paddingLeft: 40, position: 'relative' }}>
                  <div>
                    <Typography variant='h3' style={{ fontWeight: 600, padding: 10 }}>{this.props.anime.attributes.titles.en}</Typography>
                    <Typography variant='h3' style={{ fontWeight: 600, padding: 10 }}>{this.props.anime.attributes.titles.en_jp}</Typography>
                    <div style={{ display: 'flex', alignItems: 'center', paddingTop: 5 }}>
                      <Typography variant='h4' style={{ fontWeight: 600, padding: 10 }}>{this.rateToFive(this.props.anime.attributes.averageRating)}</Typography>
                      <GradeIcon fontSize='large' style={{ color: '#fbc02d' }} />
                    </div>
                  </div>
                  <div style={{ paddingTop: 25 }}>
                    <Typography variant='h4' style={{ fontWeight: 600, padding: 10 }}>Synopsis</Typography>
                    <Typography variant='h6' style={{ padding: 10 }}>{this.props.anime.attributes.description}</Typography>
                  </div>
                  <div style={{ position: 'absolute', top: 0, right: 30 }}>
                    <iframe title='trialer' id="ytplayer" width="480" height="270"
                      allow='autoplay' src={`https://www.youtube.com/embed/${this.props.anime.attributes.youtubeVideoId}`}
                      frameBorder="0"></iframe>
                  </div>
                </Grid>
              </Grid>
            </Grid>
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