import React from "react";
import { Link } from "react-router-dom";

import {
  Media,
  Avatar,
  AvatarAddOn,
  CustomInput,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  Button,
  DropdownItem
} from "@/components";

const UserRowFm = props => {
  return (
    <React.Fragment>
      <tr key={props.key}>
        <td className="align-middle">
          <CustomInput
            type="checkbox"
            onClick={e =>
              props.onSelected(props.props.employeeId, e)
            }
            id={`UserCheckbox-${props.props.employeeId}`}
          />
        </td>
        <td className="align-middle">
          <Button
            type="button"
            color="link"
            onClick={() => props.onUserEdit(props.props.employeeId)}
          >
            <i className="fa fa-fw fa-pencil mr-2"></i>
            Edit
          </Button>
        </td>
        <td className="align-middle text-center">
          <Avatar.Image
            src={props.props.profilePhoto}
            className="align-self-center"
          />
        </td>
        <td className="align-middle">
          {props.props.surname}
        </td>
        <td className="align-middle">
          {props.props.name}
        </td>
        <td className="align-middle">
          {props.props.email}
        </td>
        <td className="align-middle">
          {props.props.roleName}
        </td>
        <td className="align-middle">
          {props.props.isActive && 'Active' || 'Inactive'}
        </td>
      </tr>
    </React.Fragment>
  );
};

export { UserRowFm };
