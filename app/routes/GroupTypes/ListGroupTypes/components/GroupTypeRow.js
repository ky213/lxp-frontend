import React from 'react';

import { CustomInput, Button } from '@/components';

const GroupTypeRow = (props) => {
  return (
    <tr>
      <td className="align-middle text-center">
        {!props.hideDelete && (
          <CustomInput
            type="checkbox"
            className="p-1"
            onClick={(e) => props.onSelected(props.props.groupTypeId, e)}
            id={`OrganizationRow-${props.props.groupTypeId}`}
            label=""
            inline
          />
        )}

        <Button type="button" color="link" onClick={props.onGroupTypeEdit}>
          <i className="fa fa-fw fa-pencil mr-2"></i>
          Edit
        </Button>
      </td>
      <td className="align-middle text-left">{props.props.name}</td>
    </tr>
  );
};

export { GroupTypeRow };
