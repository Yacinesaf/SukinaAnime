import React from 'react';
import '../css/styles.css'
import '../css/animeCard.css'
import FavoriteIcon from './FavoriteIcon';
import { useLocation } from "react-router-dom";
import { rateToFive } from '../services/helperFunctions'

function AnimeCard({ obj, smDown }) {
  const location = useLocation();

  return (
    <div className='card card_shadow text-white' style={{ width: '100%', position: 'relative' }}>
      <div className='card_image' style={{ backgroundImage: `url(${obj.attributes.posterImage.small})` }} />
      <div style={{ padding: 10 }}>
        <p className='bold_text title text'>{obj.attributes.canonicalTitle}</p>
        <div style={{ position: "absolute", right: 10, top: 10, height: 48, padding: 10, borderRadius: '100%', backgroundColor: 'rgba(33, 27, 27, 0.4)' }}>
          <FavoriteIcon anime={obj} smDown={smDown} location={location} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <p className='bold_text text'>Episodes : {obj.attributes.episodeCount}</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ paddingRight: 5 }} className='bold_text text'>{rateToFive(obj.attributes.averageRating)}</p>
            <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" className="bi bi-star-fill starIcon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeCard;




