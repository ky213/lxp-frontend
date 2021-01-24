import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Library from './Library';
// import { getPrograms } from '../../Store/Reducers/programsReducer';
import { Preloader } from '../../Components';

const LibraryContainer = props => {
  // useEffect(()=>{
  //     if(props.profile.organizationId){
  //         props.getPrograms(props.profile.organizationId, props.pageId, props.perPage);
  //     }
  // },[]);

  const [all, setAll] = useState(true);
  const [isImage, setIsImage] = useState(true);
  const [isHyperlink, setIsHyperlink] = useState(true);
  const [isFiles, setIsFiles] = useState(true);

  const handleAll = () => {
    let newAll = !all;
    setAll(!all);
    if (newAll) {
      setIsImage(true);
      setIsHyperlink(true);
      setIsFiles(true);
      return;
    } else {
      setIsImage(false);
      setIsHyperlink(false);
      setIsFiles(false);
    }
  };

  useEffect(() => {
    if (isImage && isHyperlink && isFiles) {
      setAll(true);
    } else {
      setAll(false);
    }
  }, [isImage, isHyperlink, isFiles]);

  return (
    <>
      {props.isFetching ? (
        <Preloader />
      ) : (
        <Library
          libraryItemsList={props.libraryItemsList}
          direction={props.direction}
          all={all}
          setAll={handleAll}
          isImage={isImage}
          setIsImage={setIsImage}
          isHyperlink={isHyperlink}
          setIsHyperlink={setIsHyperlink}
          isFiles={isFiles}
          setIsFiles={setIsFiles}
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
  // getPrograms
})(LibraryContainer);
