import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setSelectedAnimeByFetch } from '../reduxStore/actions'
import loadingState from '../assets/loading.svg'
import GradeIcon from '@material-ui/icons/Grade';
import placeHolder from '../assets/noImageHolder.jpg'
import '../css/animeInfo.css'
import '../css/styles.css'

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

  // starToDislpay = (rate) => {
  //   let converted = (rate / 20).toFixed(2);
  //   switch (converted) {
  //     case 0 < converted > 0.5 :
  //       return ()
  //   }
  // }

  render() {
    // console.log(this.props.anime);
    // console.log(this.props.related);
    return (
      <div>
        {this.props.anime ?
          <div>
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
            <div className='row justify-content-center mx-0'>
              <div className='col-11 px-0 d-flex' style={{ position: 'relative', paddingTop: 30 }}>
                <div className='row justify-content-center'>
                  <div className='col-2' style={{ transform: 'translateY(-120px)' }}>
                    <img alt='poster' src={this.props.anime.attributes.posterImage.small} width={'100%'} style={{ boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)' }} />
                    <div style={{ padding: '30px 0px' }}>
                      <p className='info'><strong>Episodes :</strong> {this.props.anime.attributes.episodeCount}</p>
                      <p className='info'><strong>Episodes duration :</strong> {this.props.anime.attributes.episodeLength} min</p>
                      <p className='info'><strong>Status :</strong> {this.props.anime.attributes.status}</p>
                      <p className='info'><strong>Rating Rank :</strong> {this.props.anime.attributes.ratingRank}</p>
                      <p className='info'><strong>Start date :</strong> {this.props.anime.attributes.startDate}</p>
                      <p className='info'><strong>End date :</strong> {this.props.anime.attributes.endDate ? this.props.anime.attributes.endDate : 'Not finished/Dropped'}</p>
                      <p className='info'><strong>Show Type :</strong> {this.props.anime.attributes.showType}</p>
                      <p className='infoLast'><strong>Age Rating :</strong> {this.props.anime.attributes.ageRatingGuide ? this.props.anime.attributes.ageRatingGuide : this.props.anime.attributes.ageRating}</p>
                      {this.props.anime.attributes.nsfw ? <p className='info bold_text'>NSFW</p> : null}
                    </div>
                  </div>
                  <div className='col-10' style={{ paddingLeft: 40, position: 'relative' }}>
                    <div className='d-flex justify-content-between'>
                      <div>
                        <p className='anime-title bold_text'>{this.props.anime.attributes.titles.en ? this.props.anime.attributes.titles.en : this.props.anime.attributes.titles.en_jp}</p>
                        <div style={{ display: 'flex', alignItems: 'center', paddingTop: 5 }}>
                          <p className='anime-title bold_text'>{this.rateToFive(this.props.anime.attributes.averageRating)}</p>
                          <GradeIcon fontSize='large' style={{ color: '#fbc02d' }} />
                        </div>
                      </div>
                      <iframe title='trialer' id="ytplayer" width="480" height="270"
                        allow='autoplay' src={`https://www.youtube.com/embed/${this.props.anime.attributes.youtubeVideoId}`}
                        frameBorder="0"></iframe>
                    </div>
                    <div style={{ paddingTop: 30 }}>
                      <p className='subtitle bold_text'>Synopsis</p>
                      <p className='synopsis'>{this.props.anime.attributes.description}</p>
                    </div>
                    <div className='row' style={{ padding: '40px 10px' }}>
                      <p className='subtitle bold_text'>Related Animes</p>
                      {this.props.fetching ? null :
                        this.props.related.map((x, i) => (
                          <div className='col-3' style={{ paddingRight: 10 }}>
                            {/*                          <img alt src={}  width={'100%'} height={200} />*/}
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
  related: state.selectedAnime.relatedAnimes,
  fetching: state.selectedAnime.fetching,

})

export default connect(mapStateToProps, { setSelectedAnimeByFetch })(AnimeInfo)
