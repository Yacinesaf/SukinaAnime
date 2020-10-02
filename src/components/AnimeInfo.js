import React, { Component } from 'react'
import { connect } from 'react-redux'
import { rateToFive, titleFormater } from '../services/helperFunctions'
import { setSelectedAnimeByFetch, setRelatedAnimes, setSelectedAnime } from '../reduxStore/actions'
import loadingState from '../assets/loading.svg'
import placeHolder from '../assets/noImageHolder.jpg'
import '../css/animeInfo.css'
import '../css/styles.css'

class AnimeInfo extends Component {
  constructor() {
    super()
    this.state = {
      favorited: false
    }
  }


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




  // starToDislpay = (rate) => {
  //   let converted = (rate / 20).toFixed(2);
  //   switch (converted) {
  //     case 0 < converted > 0.5 :
  //       return ()
  //   }
  // }

  render() {
    return (
      <div style={{ paddingTop: 72 }}>
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
                        <p className='info'><strong>Episodes :</strong> {this.props.anime.attributes.episodeCount}</p>
                        <p className='info'><strong>Episodes duration :</strong> {this.props.anime.attributes.episodeLength ? this.props.anime.attributes.episodeLength : 24} min</p>
                        <p className='info'><strong>Status :</strong> {this.props.anime.attributes.status}</p>
                        <p className='info'><strong>Rating Rank :</strong> {this.props.anime.attributes.ratingRank}</p>
                        <p className='info'><strong>Start date :</strong> {this.props.anime.attributes.startDate}</p>
                        <p className='info'><strong>End date :</strong> {this.props.anime.attributes.endDate ? this.props.anime.attributes.endDate : 'Not finished/Dropped'}</p>
                        <p className='info'><strong>Show Type :</strong> {this.props.anime.attributes.showType}</p>
                        <p className='infoLast'><strong>Age Rating :</strong> {this.props.anime.attributes.ageRatingGuide ? this.props.anime.attributes.ageRatingGuide : this.props.anime.attributes.ageRating}</p>
                        {this.props.anime.attributes.nsfw ? <p className='info bold_text'>NSFW</p> : null}
                      </div>
                    </div>
                  }
                  <div className='col-11 col-md-10 pr-0' style={{ paddingLeft: this.props.smDown ? 0 : 40, position: 'relative' }}>
                    <div className='d-flex justify-content-between'>
                      <div>
                        <div className='d-flex align-items-center'>
                          <p className={`bold_text ${this.props.smDown ? 'anime-title-mobile' : 'anime-title'}`}>{this.props.anime.attributes.titles.en ? this.props.anime.attributes.titles.en : this.props.anime.attributes.titles.en_jp}</p>
                          {!this.props.smDown ? this.props.user ? this.state.favorited ?
                            <svg
                              style={{ cursor: 'pointer' }}
                              onClick={() => { this.setState({ favorited: !this.state.favorited }) }}
                              width="2em"
                              height="2em"
                              viewBox="0 0 16 16"
                              className="bi bi-heart-fill ml-4"
                              fill="#5f27cd"
                              xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                            </svg>
                            :
                            <svg
                              style={{ cursor: 'pointer' }}
                              onClick={() => { this.setState({ favorited: !this.state.favorited }) }}
                              width="2em"
                              height="2em"
                              viewBox="0 0 16 16"
                              className="bi bi-heart ml-4"
                              fill="white"
                              xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                            </svg>
                            : null
                            : null}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', paddingTop: this.props.smDown ? 0 : 5 }}>
                          <p className={`bold_text ${this.props.smDown ? 'subtitle-mobile' : 'anime-title'}`}>{rateToFive(this.props.anime.attributes.averageRating)}</p>
                          <svg width={this.props.smDown ? '1.5em' : "2.25em"} height={this.props.smDown ? '1.5em' : "2.25em"} viewBox="0 0 16 16" className="bi bi-star-fill starIcon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                          </svg>
                        </div>
                        {this.props.smDown ?
                          <div>
                            <p className='info-mobile'><strong>Episodes :</strong> {this.props.anime.attributes.episodeCount}</p>
                            <p className='info-mobile'><strong>Status :</strong> {this.props.anime.attributes.status}</p>
                            <a style={{ textDecoration: 'none' }} rel='noopener noreferrer' target="_blank" href={`https://www.youtube.com/watch?v=${this.props.anime.attributes.youtubeVideoId}`}>
                              <div className='trailer-btn'>
                                <p style={{ color: 'white', fontSize: 18 }}>Watch trailer</p>
                              </div>
                            </a>
                          </div>
                          : null}
                        {this.props.smDown ? null :
                          <p className={this.props.smDown ? 'subtitle-mobile' : 'subtitle'}><strong>Favorites count</strong>  :  {this.props.anime.attributes.favoritesCount}</p>
                        }
                      </div>

                      {this.props.smDown ? null
                        : <iframe title='trialer' id="ytplayer" width="480" height="270"
                          allow='autoplay' src={`https://www.youtube.com/embed/${this.props.anime.attributes.youtubeVideoId}`}
                          frameBorder="0"></iframe>
                      }
                    </div>
                    <div style={{ paddingTop: this.props.smDown ? 10 : 30 }}>
                      <p className='subtitle bold_text'>Synopsis</p>
                      <p className={this.props.smDown ? 'synopsis-mobile' : 'synopsis'}>{this.props.anime.attributes.description}</p>
                    </div>
                    <div style={{ padding: this.props.smDown ? '15px 0px' : '40px 10px' }}>
                      <p className='subtitle bold_text'>Related Animes</p>
                      <div className='row mx-0 px-0' style={{ padding: '20px 10px' }}>
                        {!this.props.fetching ?
                          this.props.related.map((x, i) => (
                            <div onClick={() => {
                              this.props.setSelectedAnime(x)
                              let categories = x.relationships.categories.data
                              this.props.setRelatedAnimes(categories[Math.floor(Math.random() * categories.length)].id)
                              this.props.history.push(`/Anime/${x.attributes.canonicalTitle}`)
                            }}
                              key={i} className='col-6 col-md-2' style={{ padding: 10, cursor: 'pointer' }}>
                              <img alt='relatedAnime' src={x.attributes.posterImage.small} width={'100%'} />
                              <p className={`bold_text py-2 ${this.props.smDown ? 'related-titles-mobile' : 'related-titles'}`}>{titleFormater(x.attributes.slug)}</p>
                            </div>
                          ))
                          :
                          Array(6).fill(0).map((x, i) => (
                            <div className='col-6 col-md-2' key={i} style={{ padding: 10 }}>
                              <div className='skeleton-box' style={{ borderRadius: 7, width: '100%', height: 316 }}></div>
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

