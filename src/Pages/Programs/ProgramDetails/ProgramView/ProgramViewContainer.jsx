import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Preloader } from 'Components';
import { useParams } from 'react-router-dom';

import ProgramView from './ProgramView';
import { setCurrentProgram } from 'Store/Reducers/programs';
import { getCourses } from 'Store/Reducers/courses';

const ProgramViewContainer = props => {
  const urlParams = useParams();

  const { profile } = props;

  useEffect(() => {
    props.getCourses(profile.organizationId, urlParams.programId);
  }, []);

  const [all, setAll] = useState(true);
  const [completed, setCompleted] = useState(true);
  const [inProgress, setInProgress] = useState(true);
  const [notStarted, setNotStarted] = useState(true);

  const handleAll = () => {
    let newAll = !all;
    setAll(!all);
    if (newAll) {
      setCompleted(true);
      setInProgress(true);
      setNotStarted(true);
      return;
    } else {
      setCompleted(false);
      setInProgress(false);
      setNotStarted(false);
    }
  };

  useEffect(() => {
    if (completed && inProgress && notStarted) {
      setAll(true);
    } else {
      setAll(false);
    }
  }, [completed, inProgress, notStarted]);

  useEffect(() => {
    if (props.currentProgram?.courses) {
      if (props.currentProgram.courses.length < 1) {
        setAll(false);
        setCompleted(false);
        setInProgress(false);
        setNotStarted(false);
      }
    }
  }, [props.currentProgram?.courses]);

  return (
    <>
      {props.isFetching ? (
        <Preloader />
      ) : (
        <ProgramView
          currentProgram={props.currentProgram}
          courses={props.courses}
          direction={props.direction}
          all={all}
          setAll={handleAll}
          completed={completed}
          setCompleted={setCompleted}
          inProgress={inProgress}
          setInProgress={setInProgress}
          notStarted={notStarted}
          setNotStarted={setNotStarted}
        />
      )}
    </>
  );
};

let mapStateToProps = state => ({
  isFetching: state.common.isFetching,
  currentProgram: state.programs.currentProgram,
  programs: state.programs.programs,
  courses: state.courses,
  direction: state.common.direction,
  profile: state.authentication.profile,
});

export default connect(mapStateToProps, {
  setCurrentProgram,
  getCourses,
})(ProgramViewContainer);
