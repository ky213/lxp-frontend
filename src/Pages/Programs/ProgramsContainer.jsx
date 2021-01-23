import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Programs from './Programs';
import { getPrograms } from '../../Store/Reducers/programs';
import { Preloader } from 'Components';

const ProgramsContainer = props => {
  useEffect(() => {
    if (props.profile.organizationId) {
      props.getPrograms(props.profile.organizationId, props.pageId, props.perPage);
    }
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
    if (props.programs.length < 1) {
      setAll(false);
      setCompleted(false);
      setInProgress(false);
      setNotStarted(false);
    }
  }, [props.programs]);

  return (
    <>
      {props.isFetching ? (
        <Preloader />
      ) : (
        <Programs
          programs={props.programs}
          direction={props.direction}
          all={all}
          setAll={handleAll}
          completed={completed}
          setCompleted={setCompleted}
          inProgress={inProgress}
          setInProgress={setInProgress}
          notStarted={notStarted}
          setNotStarted={setNotStarted}
          user={props.profile}
        />
      )}
    </>
  );
};

let mapStateToProps = state => ({
  profile: state.authentication.profile,
  programs: state.programs.programs,
  isFetching: state.common.isFetching,
  direction: state.common.direction,
  pageId: state.programs.pageId,
  perPage: state.programs.perPage,
});

export default connect(mapStateToProps, {
  getPrograms,
})(ProgramsContainer);
