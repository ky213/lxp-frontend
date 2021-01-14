import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Preloader from '../Common/Preloader/Preloader';
import SearchResult from './SearchResult';
import { setSearchValue } from '../../Store/Reducers/common';

const SearchResultContainer = props => {
  const [searchValue, setSearchValue] = useState('');

  const [viewAll, setViewAll] = useState(true);
  const [viewPrograms, setViewPrograms] = useState(true);
  const [viewCourses, setViewCourses] = useState(true);
  const [viewActivities, setViewActivities] = useState(true);

  const handleViewAll = () => {
    let newViewAll = !viewAll;
    setViewAll(!viewAll);
    if (newViewAll) {
      setViewPrograms(true);
      setViewCourses(true);
      setViewActivities(true);
      return;
    } else {
      setViewPrograms(false);
      setViewCourses(false);
      setViewActivities(false);
    }
  };

  useEffect(() => {
    if (viewActivities && viewCourses && viewPrograms) {
      setViewAll(true);
    } else {
      setViewAll(false);
    }
  }, [viewPrograms, viewCourses, viewActivities]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    props.setSearchValue(urlParams.get('value'));
  }, []);

  useEffect(() => {
    console.log('search');
  }, [props.searchValue]);

  return (
    <>
      {props.isFetching ? (
        <Preloader />
      ) : (
        <SearchResult
          searchValue={props.searchValue}
          viewAll={viewAll}
          setViewAll={handleViewAll}
          viewCourses={viewCourses}
          setViewCourses={setViewCourses}
          viewPrograms={viewPrograms}
          setViewPrograms={setViewPrograms}
          viewActivities={viewActivities}
          setViewActivities={setViewActivities}
          direction={props.direction}
        />
      )}
    </>
  );
};

let mapStateToProps = state => ({
  isFetching: state.common.isFetching,
  searchValue: state.common.searchValue,
  direction: state.common.direction,
});

export default connect(mapStateToProps, {
  setSearchValue,
})(SearchResultContainer);
