import React from 'react';
import PropTypes from 'prop-types';

const DlRowContacts = (props) => {
  return (
    <React.Fragment>
      <dl className="row">
        <dt className={`col-sm-3 ${props.leftSideClassName}`}>Phone</dt>
        <dd className={`col-sm-9 ${props.rightSideClassName}`}>
          {props.selectedUser && props.selectedUser.phone}
        </dd>
        <dt className={`col-sm-3 ${props.leftSideClassName}`}>Mobile</dt>
        <dd className={`col-sm-9 ${props.rightSideClassName}`}>
          {props.selectedUser && props.selectedUser.mobile}
        </dd>
        <dt className={`col-sm-3 ${props.leftSideClassName}`}>Fax</dt>
        <dd className={`col-sm-9 ${props.rightSideClassName}`}>
          {props.selectedUser && props.selectedUser.fax}
        </dd>
        <dt className={`col-sm-3 ${props.leftSideClassName}`}>Email</dt>
        <dd className={`col-sm-9 ${props.rightSideClassName}`}>
          {props.selectedUser && <a href="#">{props.selectedUser.email}</a>}
        </dd>
      </dl>
    </React.Fragment>
  );
};

export { DlRowContacts };
