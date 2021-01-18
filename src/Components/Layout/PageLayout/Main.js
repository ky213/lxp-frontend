import React from 'react';
import PageHeader from './PageHeader';

import classes from './styles.module.css';

const PageLayout = props => {
  return (
    <div className={classes.main}>
      <PageHeader title={props.title} />
      {props.children}
    </div>
  );
};

export default PageLayout;
