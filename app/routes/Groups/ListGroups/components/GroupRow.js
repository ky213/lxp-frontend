import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

import {
  Media,
  Avatar,
  AvatarAddOn,
  CustomInput,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  Button,
  DropdownItem,
} from '@/components';

const GroupRow = (props) => {
  return (
    <React.Fragment>
      <tr>
        <td className="align-middle text-center">
          {!props.hideDelete && (
            <CustomInput
              type="checkbox"
              className="p-1"
              onClick={(e) => props.onSelected(props.props.groupId, e)}
              id={`OrganizationRow-${props.props.groupId}`}
              label=""
              inline
            />
          )}
          <Button
            type="button"
            color="link"
            onClick={() => props.onGroupEdit(props.props.groupId)}
          >
            <i className="fa fa-fw fa-pencil mr-2"></i>
            Edit
          </Button>
        </td>
        <td className="align-middle text-left">{props.props.name}</td>
        <td className="align-middle text-left">
          {props.props.programDirectors &&
            props.props.programDirectors.map((pd) => pd.name).join(', ')}
        </td>
      </tr>
    </React.Fragment>
  );
};

export { GroupRow };
