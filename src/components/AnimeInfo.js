import React, { Component } from 'react'
import { connect } from 'react-redux'
import { rateToFive, titleFormater } from '../services/helperFunctions'
import { setSelectedAnimeByFetch, setRelatedAnimes, setSelectedAnime } from '../reduxStore/actions'
import loadingState from '../assets/loading.svg'
import placeHolder from '../assets/noImageHolder.jpg'
import '../css/animeInfo.css'
import '../css/styles.css'
import FavoriteIcon from './FavoriteIcon'

class AnimeInfo extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
    let name = this.props.location.pathname.split('/')
    if (this.props.categoryId) {
      this.props.setRelatedAnimes(this.props.categoryId)
    }
    if (!this.props.anime) {
      this.props.setSelectedAnimeByFetch(name[name.length - 1]).then(() => {
        this.props.setRelatedAnimes(this.props.categoryId)
      })
    }
  }



  render() {
    return (
      <div style={{ paddingTop: this.props.smDown ? 64 : 72 }}>
        {this.props.anime ?
          <div>
            {this.props.smDown ?
              <FavoriteIcon isFromSelectedAnime={true} animeId={this.props.anime.id} smDown={this.props.smDown} />
              : null}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundImage: this.props.anime.attributes.coverImage ? `url(${this.props.anime.attributes.coverImage.original})` : `url(${placeHolder})`,
              width: '100%',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: this.props.smDown ? 150 : 350,
              boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
            }} />
            <div className='row justify-content-center mx-0'>
              <div className='col-11 px-0 d-flex' style={{ position: 'relative', paddingTop: 30 }}>
                <div className='row justify-content-center px-0 mx-0'>
                  {this.props.smDown ? null :
                    <div className='col-2' style={{ transform: 'translateY(-120px)' }}>
                      <img alt='poster' src={this.props.anime.attributes.posterImage.small} width={'100%'} style={{ boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)' }} />
                      <div style={{ padding: '30px 0px' }}>
                        <div className='info'><strong>Episodes :</strong> {this.props.anime.attributes.episodeCount}</div>
                        <div className='info'><strong>Episodes duration :</strong> {this.props.anime.attributes.episodeLength ? this.props.anime.attributes.episodeLength : 24} min</div>
                        <div className='info'><strong>Status :</strong> {this.props.anime.attributes.status}</div>
                        <div className='info'><strong>Rating Rank :</strong> {this.props.anime.attributes.ratingRank}</div>
                        <div className='info'><strong>Start date :</strong> {this.props.anime.attributes.startDate}</div>
                        <div className='info'><strong>End date :</strong> {this.props.anime.attributes.endDate ? this.props.anime.attributes.endDate : 'Not finished/Dropped'}</div>
                        <div className='info'><strong>Show Type :</strong> {this.props.anime.attributes.showType}</div>
                        {this.props.anime.attributes.nsfw ? <div className='info bold_text'>NSFW</div> : null}
                        <div className='infoLast'><strong>Age Rating :</strong> {this.props.anime.attributes.ageRatingGuide ? this.props.anime.attributes.ageRatingGuide : this.props.anime.attributes.ageRating}</div>
                      </div>
                    </div>
                  }
                  <div className='col-11 col-md-10 pr-0' style={{ paddingLeft: this.props.smDown ? 0 : 40, position: 'relative' }}>
                    <div className='d-flex justify-content-between'>
                      <div>
                        <div className='d-flex align-items-center'>
                          <div className={`bold_text ${this.props.smDown ? 'anime-title-mobile' : 'anime-title'}`}>{this.props.anime.attributes.titles.en ? this.props.anime.attributes.titles.en : this.props.anime.attributes.titles.en_jp}</div>
                          {!this.props.smDown ? this.props.user ?
                            <FavoriteIcon isFromSelectedAnime={true} animeId={this.props.anime.id} />
                            : null
                            : null}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', paddingTop: this.props.smDown ? 0 : 5 }}>
                          <div className={`bold_text ${this.props.smDown ? 'subtitle-mobile' : 'anime-title'}`} style={{ paddingRight: this.props.smDown ? 3 : 'unset' }}>{rateToFive(this.props.anime.attributes.averageRating)}</div>
                          <svg width={this.props.smDown ? '1.5em' : "2em"} height={this.props.smDown ? '1.5em' : "2em"} viewBox="0 0 16 16" className="bi bi-star-fill starIcon ml-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                          </svg>
                        </div>
                        {this.props.smDown ?
                          <div>
                            <div className='info-mobile'><strong>Episodes :</strong> {this.props.anime.attributes.episodeCount}</div>
                            <div className='info-mobile'><strong>Status :</strong> {this.props.anime.attributes.status}</div>
                            <a style={{ textDecoration: 'none' }} rel='noopener noreferrer' target="_blank" href={`https://www.youtube.com/watch?v=${this.props.anime.attributes.youtubeVideoId}`}>
                              <div className='trailer-btn'>
                                <div style={{ color: 'white', fontSize: 18 }}>Watch trailer</div>
                              </div>
                            </a>
                          </div>
                          : null}
                        {this.props.smDown ? null :
                          <div className={this.props.smDown ? 'subtitle-mobile' : 'subtitle'}><strong>Favorites count</strong>  :  {this.props.anime.attributes.favoritesCount}</div>
                        }
                      </div>

                      {this.props.smDown ? null
                        : <iframe title='trialer' id="ytplayer" width="480" height="270"
                          allow='autoplay' src={`https://www.youtube.com/embed/${this.props.anime.attributes.youtubeVideoId}`}
                          frameBorder="0"></iframe>
                      }
                    </div>
                    <div style={{ paddingTop: this.props.smDown ? 10 : 30 }}>
                      <div className='subtitle bold_text'>Synopsis</div>
                      <div className={this.props.smDown ? 'synopsis-mobile' : 'synopsis'}>{this.props.anime.attributes.description}</div>
                    </div>
                    <div style={{ padding: this.props.smDown ? '15px 0px' : '40px 10px' }}>
                      <div className='subtitle bold_text'>Related Animes</div>
                      <div className='row mx-0 px-0' style={{ padding: '20px 10px' }}>
                        {!this.props.fetching ?
                          this.props.related.map((x, i) => (
                            <div onClick={() => {
                              this.props.setSelectedAnime(x)
                              let categories = x.relationships.categories.data
                              this.props.setRelatedAnimes(categories[Math.floor(Math.random() * categories.length)].id)
                              this.props.history.push(`/Anime/${x.attributes.canonicalTitle}`)
                              window.scrollTo(0,0)
                            }}
                              key={i} className='col-6 col-md-2' style={{ padding: 10, cursor: 'pointer' }}>
                              <img alt='relatedAnime' src={x.attributes.posterImage.small} width={'100%'} />
                              <div className={`bold_text py-2 ${this.props.smDown ? 'related-titles-mobile' : 'related-titles'}`}>{titleFormater(x.attributes.slug)}</div>
                            </div>
                          ))
                          :
                          Array(6).fill(0).map((x, i) => (
                            <div className='col-6 col-md-2' key={i} style={{ padding: 10 }}>
                              <div className='skeleton-box' style={{ borderRadius: 7, width: '100%', height: this.props.smDown ? 254 : 316 }}></div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          :
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 72px)' }}>
            <img alt='loading' src={loadingState} style={{ transform: this.props.smDown ? 'scale(0.2)' : 'scale(0.6)' }} />
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
  categoryId: state.selectedAnime.categoryId,
  user: state.user.id
})

export default connect(mapStateToProps, { setSelectedAnimeByFetch, setRelatedAnimes, setSelectedAnime })(AnimeInfo)

