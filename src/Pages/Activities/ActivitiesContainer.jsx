import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Activities from './Activities';
import { getActivities } from '../../Store/Reducers/activities';
import { Preloader } from '../../Components';
import { useLayoutEffect } from 'react';

const ActivitiesContainer = props => {
  useEffect(() => {
    if (props.profile.employeeId) {
      props.getActivities(props.profile.employeeId, props.profile.userId, props.profile.organizationId);
    }
  }, []);

  const [all, setAll] = useState(true);
  const [completed, setCompleted] = useState(true);
  const [inProgress, setInProgress] = useState(true);
  const [notStarted, setNotStarted] = useState(true);
  const [privateParam, setPrivateParam] = useState(true);

  const handleAll = () => {
    let newAll = !all;
    setAll(!all);
    if (newAll) {
      setCompleted(true);
      setInProgress(true);
      setNotStarted(true);
      setPrivateParam(true);
      return;
    } else {
      setCompleted(false);
      setInProgress(false);
      setNotStarted(false);
      setPrivateParam(false);
    }
  };

  useEffect(() => {
    if (completed && inProgress && notStarted && privateParam) {
      setAll(true);
    } else {
      setAll(false);
    }
  }, [completed, inProgress, notStarted, privateParam]);

  const [size, setSize] = useState([window.outerWidth, window.innerHeight]);
  const [blockWidth, setBlockWidth] = useState(49);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.outerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (size[0] > 700) {
      setBlockWidth(49);
    } else {
      setBlockWidth(100);
    }
  }, [size]);

  return (
    <h1>
      {props.isFetching ? (
        <Preloader />
      ) : (
        <>
          {
            <Activities
              activities={props.activities}
              direction={props.direction}
              blockWidth={blockWidth}
              all={all}
              setAll={handleAll}
              completed={completed}
              setCompleted={setCompleted}
              inProgress={inProgress}
              setInProgress={setInProgress}
              notStarted={notStarted}
              setNotStarted={setNotStarted}
              privateParam={privateParam}
              setPrivateParam={setPrivateParam}
            />
          }
        </>
      )}
    </h1>
  );
};

let mapStateToProps = state => ({
  isFetching: state.activities.loading,
  profile: state.authentication.profile,
  activities: state.activities.activities,
  isAuthenticated: state.authentication.isAuthenticated,
  direction: state.common.direction,
});

export default connect(mapStateToProps, {
  getActivities,
})(ActivitiesContainer);
