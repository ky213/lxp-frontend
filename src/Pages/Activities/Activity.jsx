import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { NavLink, withRouter } from 'react-router-dom';

import classes from './Activity.module.css';
import { setIsFetching } from 'Store/Reducers/common';
import { getOneActivity } from 'Store/Reducers/activities';
import Chat from './Chat/Chat';
import DeleteModal from 'Components/DeleteModal/DeleteModal';
import { Preloader } from 'Components';

const StyledMarkButton = styled.button`
  margin-left: ${({ direction }) => (direction === 'ltr' ? '8px' : '0')};
  margin-right: ${({ direction }) => (direction === 'rtl' ? '8px' : '0')};
`;

const StyledLeftSide = styled.div`
  margin-left: ${({ direction }) => (direction === 'rtl' ? '30px' : '0')};
  margin-right: ${({ direction }) => (direction === 'ltr' ? '30px' : '0')};
`;

const StyledProgressSpan = styled.span`
  margin-left: ${({ direction }) => (direction === 'ltr' ? '13px' : '0')};
  margin-right: ${({ direction }) => (direction === 'rtl' ? '13px' : '0')};
`;

const Activity = props => {
  const { t, i18n } = useTranslation();

  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

  useEffect(() => {
    let activityId = props.match.params.activityId;
    props.getActivity(activityId, props.profile.selectedOrganizationId);
  }, []);

  const [daysLag, setDaysLag] = useState(0);
  useEffect(() => {
    if (props.activity) {
      const endTime = new Date(props.activity.end);
      const now = new Date();

      var newDaysLag = Math.ceil(Math.abs(endTime.getTime() - now.getTime()) / (1000 * 3600 * 24));

      if (endTime >= now) {
        newDaysLag = newDaysLag + t('activityMini.daysLeft');
      } else {
        newDaysLag = newDaysLag + t('activityMini.daysAgo');
      }
      setDaysLag(newDaysLag);
    }
  }, [props.activity]);

  return (
    <div className={classes.main}>
      {!props.activity ? (
        <Preloader />
      ) : (
        <div className={classes.container}>
          {isShowDeleteModal && (
            <DeleteModal
              setIsShowDeleteModal={setIsShowDeleteModal}
              title={t('deleteActivity.title')}
              sub={t('deleteActivity.sub')}
              deleteText={t('deleteActivity.delete')}
              cancelText={t('deleteActivity.cancel')}
            />
          )}
          <StyledLeftSide className={classes.leftSide} direction={props.direction}>
            <div className={classes.block + ' ' + classes.withoutPadding}>
              <div className={classes.infoBlock}>
                <p>{t('home.statistic.infoUser.welcome')}</p>
                <h3>{props.profile.name}</h3>
              </div>
              <div className={classes.infoBlock}>
                <label>{t('home.statistic.infoUser.learningHours')}</label>
                <span>
                  <strong>34 {t('home.statistic.infoUser.hours')}</strong> {t('home.statistic.infoUser.and')}{' '}
                  <strong>54 {t('home.statistic.infoUser.mins')}</strong>
                </span>
              </div>
              <hr className={classes.line} />
              <div className={classes.infoBlock}>
                <label>{t('home.statistic.infoUser.learningGoal')}</label>
                <span>
                  <strong>34 {t('home.statistic.infoUser.hours')}</strong>
                </span>
              </div>
            </div>
            {/* <div className={classes.block + " " + classes.programs}>
                        <div className={classes.programsHeader}>
                            <h4>{t("home.statistic.programs.related")}</h4>
                            <NavLink to="/programs">{t("home.statistic.programs.viewAll")}</NavLink>
                        </div>
                        <div className={classes.progressBlock}>
                            <label>Sketching out ideas for securin....</label>
                            <div className={classes.progressContainer}>
                                <ProgressBar width={widthProgressBar} height={heightProgressBar} progress={78}/>
                                <span>78%</span>
                            </div>
                        </div>
                        <div className={classes.progressBlock}>
                            <label>Team brainstorming</label>
                            <div className={classes.progressContainer}>
                                <ProgressBar width={widthProgressBar} height={heightProgressBar} progress={42}/>
                                <span>42%</span>
                            </div>
                        </div>
                    </div> */}
          </StyledLeftSide>
          <div className={classes.rightSide}>
            <div className={classes.tabHeader}>
              <h1>{t('activityDetails.title')}</h1>
              <span>{props.activity.isPublic ? t('activityDetails.public') : t('activityDetails.private')}</span>
            </div>
            <div className={classes.activity}>
              <div className={classes.activityHeader}>
                <span className={classes.fullPath}>
                  <span className={classes.path}>Cybersecurity awareness &gt;</span> Cybersecurity
                </span>
                <div className={classes.headerRightSide}>
                  <NavLink to={`/activities/edit/${props.match.params.activityId}`} className={classes.editBut}>
                    <i className="far fa-edit"></i>
                    {t('activityDetails.edit')}
                  </NavLink>
                  <button className={classes.removeBut} onClick={() => setIsShowDeleteModal(true)}>
                    <i className="far fa-trash-alt"></i>
                    {t('activityDetails.delete')}
                  </button>
                </div>
              </div>
              <h2>{props.activity.name}</h2>
              <div className={classes.activityFoot}>
                <div className={classes.activityProgressBlock}>
                  {/* <ProgressBar width={widthProgressBar} height={heightProgressBar} progress={props.activity.totalPoints}/>
                                <StyledProgressSpan direction={props.direction}>{props.activity.totalPoints}%</StyledProgressSpan> */}
                  <span>
                    {t('activityDetails.points')} {props.activity.totalPoints}
                  </span>
                </div>
                <div className={classes.activityFootRight}>
                  <span>{daysLag}</span>
                  <StyledMarkButton className={classes.mark} direction={props.direction}>
                    {t('activityDetails.butComplete')}
                  </StyledMarkButton>
                </div>
              </div>
            </div>
            <div className={classes.videoBlock}>
              <div className={classes.video}>
                <button>
                  <i className="fas fa-play-circle"></i>
                </button>
              </div>
            </div>
            <div className={classes.chatBlock}>
              <h1>{props.activity.isPublic ? t('activityDetails.discuss') : t('activityDetails.contact')}</h1>
              <Chat currentUser={props.profile} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

let WithUrlDataContainerComponent = withRouter(Activity);

let mapStateToProps = state => ({
  isFetching: state.common.isFetching,
  activity: state.activities.currentActivity,
  activities: state.activities.activities,
  profile: state.authentication.profile,
  direction: state.common.direction,
});

export default connect(mapStateToProps, {
  setIsFetching,
  getOneActivity,
})(WithUrlDataContainerComponent);
