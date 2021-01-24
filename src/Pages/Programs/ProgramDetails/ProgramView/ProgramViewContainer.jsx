import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Preloader } from 'Components';
import ProgramView from './ProgramView';
import { withRouter } from 'react-router-dom';
import { setCurrentProgram } from 'Store/Reducers/programs';

const ProgramViewContainer = props => {
  useEffect(() => {
    let programId = props.match.params.programId;
    props.programs.forEach(prog => {
      if (prog.programId === programId) {
        props.setCurrentProgram(prog);
      }
    });
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

let WithUrlDataContainerComponent = withRouter(ProgramViewContainer);

let mapStateToProps = state => ({
  isFetching: state.common.isFetching,
  currentProgram: state.programs.currentProgram,
  programs: state.programs.programs,
  direction: state.common.direction,
});

export default connect(mapStateToProps, {
  setCurrentProgram,
})(WithUrlDataContainerComponent);
