import React from 'react';

import PlayButton from 'Assets/Icons/PlayButton.svg';
import classes from './styles.module.css';

const Body = props => {
  return (
    <div className={classes.main}>
      <div className={classes.playerContainer}>
        <div className={classes.player}>
          <div className={classes.playButton}>
            <img src={PlayButton} alt="play_button" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
