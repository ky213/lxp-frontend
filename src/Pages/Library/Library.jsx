import React from 'react';
import classes from './Library.module.css';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { empty_state_icon } from '../../Assets/Images/empty_state_icon';

const StyledLabel = styled.label`
  margin-left: ${({ direction }) => (direction === 'rtl' ? '56px' : '0')};
  margin-right: ${({ direction }) => (direction === 'ltr' ? '56px' : '0')};
`;

const Library = props => {
  const { t, i18n } = useTranslation();

  let libraryItemsList = [];

  // libraryItemsList = props.libraryItemsList.map(item => {

  // });

  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <div className={classes.container}>
          <h1>{t('activities.library.title')}</h1>
          <div className={classes.filters}>
            <StyledLabel className={classes.filter} direction={props.direction}>
              <span className={classes.filterText}>{t('courses.filters.all')}</span>
              <input
                type="checkbox"
                onChange={() => {
                  props.setAll();
                }}
                checked={props.all}
                value={props.all}
              />
              <span className={classes.checkmark}></span>
            </StyledLabel>
            <StyledLabel className={classes.filter} direction={props.direction}>
              <span className={classes.filterText}>{t('activities.library.images')}</span>
              <input
                type="checkbox"
                onChange={() => {
                  props.setIsImage(!props.isImage);
                }}
                checked={props.isImage}
              />
              <span className={classes.checkmark}></span>
            </StyledLabel>
            <StyledLabel className={classes.filter} direction={props.direction}>
              <span className={classes.filterText}>{t('activities.library.hyperlinks')}</span>
              <input
                type="checkbox"
                onChange={() => {
                  props.setIsHyperlink(!props.isHyperlink);
                }}
                checked={props.isHyperlink}
              />
              <span className={classes.checkmark}></span>
            </StyledLabel>
            <StyledLabel className={classes.filter} direction={props.direction}>
              <span className={classes.filterText}>{t('activities.library.files')}</span>
              <input
                type="checkbox"
                onChange={() => {
                  props.setIsFiles(!props.isFiles);
                }}
                checked={props.isFiles}
              />
              <span className={classes.checkmark}></span>
            </StyledLabel>
          </div>
        </div>
      </div>
      <div className={classes.itemsList}>
        <div className={classes.containerItems}>
          {libraryItemsList.length > 0 && libraryItemsList != null && libraryItemsList != undefined ? (
            libraryItemsList
          ) : (
            <div className={classes.empty}>
              <div className={classes.emptyIcon}>{empty_state_icon}</div>
              <span>{t('activities.library.noResources')}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Library;
