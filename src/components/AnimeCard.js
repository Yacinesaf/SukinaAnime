import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import '../css/styles.css'
import '../css/animeCard.css'

function AnimeCard({ obj, isUserLogged, isFavorite }) {
  const rateToFive = (rate) => {
    return (rate / 20).toFixed(2)
  }


  return (
    <div className='card card_shadow text-white' style={{ width: '100%' }}>
      <div className='card_image' style={{ backgroundImage: `url(${obj.attributes.posterImage.small})` }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: 10 }}>
        <div>
          <p className='bold_text title text'>{obj.attributes.canonicalTitle}</p>
          <p className='bold_text text'>Episodes : {obj.attributes.episodeCount}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          {isUserLogged ? isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon /> : null}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p className='bold_text text'>{rateToFive(obj.attributes.averageRating)}</p>
            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-star-fill starIcon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeCard;




