import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Preloader } from 'Components';
import { getOneLesson, resetLessonsState } from 'Store/Reducers/lessons';
import { Header, Body } from './Components';

const Lesson = props => {
  const urlParams = useParams();

  const { profile, lessons } = props;

  useEffect(() => {
    props.getOneLesson(profile.organizationId, urlParams.lessonId);
    return props.resetLessonsState;
  }, []);

  if (lessons.loading) return <Preloader />;

  return (
    <div>
      <Header lesson={lessons} />
      <Body lesson={lessons} />
    </div>
  );
};

const mapStateToprops = state => ({
  profile: state.authentication.profile,
  lessons: state.lessons,
});

const mapDispatchToProps = {
  getOneLesson,
  resetLessonsState,
};

export default connect(mapStateToprops, mapDispatchToProps)(Lesson);
