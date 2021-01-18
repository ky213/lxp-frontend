import React from 'react';

import classes from './styles.css';

const PageLayout = props => {
  return <div className={classes.main}>{props.children}</div>;
};

export default PageLayout;
