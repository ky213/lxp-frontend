import React from 'react';
import { CustomInput, Button } from '@/components';

const GroupRow = (props) => {
  return (
    <tr>
      <td className="align-middle text-center">
        {!props.hideDelete && (
          <CustomInput
            type="checkbox"
            className="p-1"
            onClick={props.onSelected}
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
      <td className="align-middle text-left">{props.props.groupTypesName}</td>
      <td className="align-middle text-left">{props.props.description}</td>
    </tr>
  );
};

export { GroupRow };
