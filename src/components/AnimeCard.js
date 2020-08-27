import React from 'react';
import { Card, CardActions, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import GradeIcon from '@material-ui/icons/Grade';

function AnimeCard({ obj, isUserLogged, isFavorite }) {
  const rateToFive = (rate) => {
    return (rate / 20).toFixed(2)
  }


  return (
    <Card elevation={2} style={{ width: '100%' }}>
      <div style={{ backgroundImage: `url(${obj.attributes.posterImage.small})`, backgroundPosition: 'center', backgroundSize: 'cover', height: 250, width: '100%' }} />
      <CardActions style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <Typography style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 272, fontWeight: 600 }}>{obj.attributes.canonicalTitle}</Typography>
          <Typography style={{ fontWeight: 600 }}>Episodes : {obj.attributes.episodeCount}</Typography>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          {isUserLogged ? isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon /> : null}
          <div style={{ display: 'flex', alignItems: 'flex-end', paddingTop: 5 }}>
            <Typography style={{ fontWeight: 600 }}>{rateToFive(obj.attributes.averageRating)}</Typography>
            <GradeIcon style={{ color: '#fbc02d', paddingLeft: 5, paddingBottom: 1.5 }} />
          </div>
        </div>
      </CardActions>
    </Card>
  );
}

export default AnimeCard;




