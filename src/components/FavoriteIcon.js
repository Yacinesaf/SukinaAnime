import React, { Component } from 'react';
import { connect } from 'react-redux'
import { favoriteToggler } from '../reduxStore/actions'


class FavoriteIcon extends Component {
  render() {
    let anime = null
    if (this.props.animes.length) {
      anime = this.props.animes.find(x => {
        return x.id === this.props.animeId
      })
    } else {
      anime = { ...this.props.selectedAnime }
    }

    return (
      <div style={{
        position: this.props.isFromSelectedAnime && !this.props.smDown ? 'unset' : "absolute",
        right: !this.props.isFromSelectedAnime ? 10 : !this.props.smDown ? 'unset' : 20,
        top: !this.props.isFromSelectedAnime ? 10 : !this.props.smDown ? 'unset' : 80,
        height: 48, padding: 10,
        borderRadius: '100%',
        backgroundColor: 'rgba(33, 27, 27, 0.4)'
      }}
        onClick={(e) => {
          e.stopPropagation()
          this.props.favoriteToggler(anime)
        }}>
        {this.props.user ? anime.isFavorite ?
          <svg
            style={{ cursor: 'pointer' }}
            width={this.props.smDown ? '1.75em' : '2em'}
            height={this.props.smDown ? '1.75em' : '2em'}
            viewBox="0 0 16 16"
            className={`bi bi-heart-fill ${this.props.smDown || !this.props.isFromSelectedAnime ? 'ml-0' : 'ml-4'}`}
            fill="#5f27cd"
            xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
          </svg>
          :
          <svg
            style={{ cursor: 'pointer' }}
            width={this.props.smDown ? '1.75em' : '2em'}
            height={this.props.smDown ? '1.75em' : '2em'}
            viewBox="0 0 16 16"
            className={`bi bi-heart-fill ${this.props.smDown || !this.props.isFromSelectedAnime ? 'ml-0' : 'ml-4'}`}
            fill="white"
            xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
          </svg>
          : null}
      </div>
    )
  }

}

const mapStateToProps = state => ({
  user: state.user.id,
  animes: state.animes.animes,
  selectedAnime: state.selectedAnime.selectedAnime,
  canFavorite: state.animes.canFavorite,
})

export default connect(mapStateToProps, { favoriteToggler })(FavoriteIcon);