import React from 'react';
import { Card, CardActions, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import GradeIcon from '@material-ui/icons/Grade';

function AnimeCard({ img, name, japName, rate, isUserLogged }) {
  const rateToFive = (rate) => {
    return (rate / 20).toFixed(2)
  }

  return (
    <Card style={{ width: '100%' }}>
      <div style={{ backgroundImage: `url(${img})`, backgroundPosition: 'center', backgroundSize: 'cover', height: 250, width: '100%' }} />
      <CardActions style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Typography>{name}</Typography>
          <Typography>{japName}</Typography>
        </div>
        <div>
          {isUserLogged ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography>{rateToFive(rate)}</Typography>
            <GradeIcon style={{ color: '#fbc02d', paddingLeft: 5 }} />
          </div>
        </div>
      </CardActions>
    </Card>
  );
}

export default AnimeCard;