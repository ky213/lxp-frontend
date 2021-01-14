import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Programs from './Programs';
import { getPrograms } from '../../Store/Reducers/programs';
import Preloader from '../Common/Preloader/Preloader';

const ProgramsContainer = props => {
  useEffect(() => {
    if (props.user.organizationId) {
      props.getPrograms(props.user.organizationId, props.pageId, props.perPage);
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
        />
      )}
    </>
  );
};

let mapStateToProps = state => ({
  user: state.user.user,
  programs: state.programs.programs,
  isFetching: state.common.isFetching,
  direction: state.common.direction,
  pageId: state.programs.pageId,
  perPage: state.programs.perPage,
});

export default connect(mapStateToProps, {
  getPrograms,
})(ProgramsContainer);
