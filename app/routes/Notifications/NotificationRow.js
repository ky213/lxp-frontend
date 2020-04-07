import React from "react";
import PropTypes from "prop-types";

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
import {notificationService} from '@/services';

/*eslint-disable */
const notificationIcons = [
  {
      type: "WARNING",
      icon: (<span className="fa-stack fa-lg fa-fw d-flex mr-3">
              <i className="fa fa-circle fa-fw fa-stack-2x text-warning"></i>
              <i className="fa fa-exclamation fa-stack-1x fa-fw text-white"></i>
          </span>)
  },
  {
      type: "ERROR",
      icon: (<span className="fa-stack fa-lg fa-fw d-flex mr-3">
              <i className="fa fa-circle fa-fw fa-stack-2x text-danger"></i>
              <i className="fa fa-close fa-stack-1x fa-fw text-white"></i>
          </span>)
  },
  {
      type: "INFO",
      icon: (<span className="fa-stack fa-lg fa-fw d-flex mr-3">
              <i className="fa fa-circle fa-fw fa-stack-2x text-primary"></i>
              <i className="fa fa-info fa-stack-1x fa-fw text-white"></i>
          </span>)
  }
];
/*eslint-enable */

const NotificationRow = props => {
  const notification = props.notification;
  if(!notification) return null;



  return (
    <React.Fragment>
      <tr key={notification.notificationId}>
        <td className="align-middle text-center">
          {notification && notificationIcons.filter(x => x.type == notification.notificationType)[0].icon}
        </td>
        <td className="align-middle">
          {notification.notificationTypeName}
        </td>
        <td className="align-middle">
          <p className="mt-2 mb-1" dangerouslySetInnerHTML={{ __html: notification.text }} />
        </td>
        <td className="align-middle">
          <input type="checkbox" checked={notification.isRead} checked={notification.isRead} onChange={(ev) => props.onChangeIsRead(notification.notificationId, ev.target.checked)} />
        </td>
        <td className="align-middle text-right">
          <Button
            type="button"
            color="link"
            onClick={() => props.onShowNotification(notification)}
          >
            <i className="fa fa-fw fa-search mr-2"></i>
            Show
          </Button>
        </td>
      </tr>
    </React.Fragment>
  );
};

export { NotificationRow };
