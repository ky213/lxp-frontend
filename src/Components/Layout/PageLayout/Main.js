import React from 'react';
import PropTypes from 'prop-types';

import { Preloader, SnackProvider } from 'Components';
import PageHeader from './PageHeader';
import classes from './styles.module.css';

const PageLayout = props => {
  return (
    <div className={classes.main}>
      <SnackProvider>
        <PageHeader title={props.title} />
        <div className={classes.pageBody}>{props.loading ? <Preloader /> : props.children}</div>
      </SnackProvider>
    </div>
  );
};

export default PageLayout;

PageLayout.prototypes = {
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};
