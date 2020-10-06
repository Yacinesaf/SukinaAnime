import React, { Component } from 'react'
import '../css/styles.css'
import { connect } from 'react-redux'
import { setFavorites, setSelectedAnime, setRelatedAnimes } from '../reduxStore/actions'
import { titleFormater } from '../services/helperFunctions'

class Profile extends Component {
  componentDidMount() {
    this.props.setFavorites()
  }

  render() {
    if (this.props.user) {
      return (
        <div style={{ paddingTop: 72 }}>
          <div className='p-3 p-md-5'>
            <div className='row mx-0 justify-content-center'>
              <div className='avatar' style={{ cursor: 'none', height: this.props.smDown ? 80 : 160, width: this.props.smDown ? 80 : 160 }}></div>
            </div>
            <div className='row mx-0' style={{ padding: this.props.smDown ? '40px 0px' : '100px 120px' }}>
              {this.props.fetchingFavorites ?
                null :
                this.props.myFavorites.map((x, i) => (
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
              }
              <div className='col-'>
              </div>
            </div>
          </div>
        </div>
      )
    }
    this.props.history.push('/')

  }
}

const mapStateToProps = state => ({
  myFavorites: state.myFavorites.favorites,
  fetchingFavorites: state.myFavorites.fetchingFavorites,
  user: state.user.id
})

export default connect(mapStateToProps, { setFavorites, setSelectedAnime, setRelatedAnimes })(Profile);