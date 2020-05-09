import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {notificationService } from '@/services';
import { useAppState } from '@/components/AppState';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import {useInterval} from '@/helpers';

import {
    UncontrolledDropdown,
    DropdownToggle,
    IconWithBadge,
    Badge,
    ExtendedDropdown,
    ListGroup,
    ListGroupItem,
    Media,
    Button
} from '@/components';



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

const contentInfo = ({ closeToast, notification }) => (
    <Media>
        <Media middle left className="mr-3">
            <i className="fa fa-fw fa-2x fa-info"></i>
        </Media>
        <Media body>
            <p dangerouslySetInnerHTML={{ __html: notification.text }}></p>
            <div className="d-flex mt-2">
                <Button color="primary" onClick={closeToast}>
                    Ok
                </Button>
                {/*<Button color="link" onClick={() => { closeToast }}  className="ml-2 text-primary">
                    Cancel
                </Button>*/}
            </div>
        </Media>
    </Media>
);

const NavbarActivityFeed = (props) => {
    const [{currentUser, selectedInstitute}, dispatch] = useAppState();
    const loggedInUser = currentUser && currentUser.user || null;
    const [notifications, setNotifications] = React.useState([]);
    const [unreadCount, setUnreadCount] = React.useState(0);

    const getNotifications = async () => {
        const data = await notificationService.getAllUnread(5, selectedInstitute && selectedInstitute.instituteId);
        setUnreadCount(data.totalUnreadCount);

        if(data.totalUnreadCount > 0) {
            if(data.unreadNotifications.length != notifications.length) {
                const oldNotifications = notifications.map(n => n.notificationId);
    
                const difference = data.unreadNotifications.filter(nn => !oldNotifications.includes(nn.notificationId));
                if(difference && difference.length > 0) {
                    setNotifications(difference);
                }
            }
        }
        else {
            setNotifications([]);
        }
    }

    useInterval(async () => {
        if(loggedInUser) {
            await getNotifications();
            //console.log("RMS_API_URL", process.env.API_URL, config.apiUrl)
        }
    }, 30000);

    React.useEffect(() => {
        if(loggedInUser) {
            
            const fetchData = async () => {
                await getNotifications();
            }

            fetchData();
        }
    }, [])

    React.useEffect(() => {
        if(loggedInUser) {
            notifications.map(not => {
                const close = async () => {
                    await notificationService.setRead({notificationId:not.notificationId, isRead: true});
                    await getNotifications();
                }
                toast.info(contentInfo({notification: not, closeToast: close }));
            })
        }
    }, [notifications])

    return (
    <>
        <UncontrolledDropdown nav inNavbar { ...props }>
            <DropdownToggle nav>
                <IconWithBadge
                    badge={ <Badge pill color="primary">{unreadCount}</Badge> }
                >
                    <i className="fa fa-bell-o fa-fw" />
                </IconWithBadge>
            
            </DropdownToggle>
            <ExtendedDropdown right>
                <ExtendedDropdown.Section className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-0">Notifications</h6>
                    <Badge pill>{notifications.length}</Badge>
                </ExtendedDropdown.Section>

                <ExtendedDropdown.Section list>
                    <ListGroup>
                    {
                        notifications.map((notification, index) => (
                            <ListGroupItem key={ index } action>
                                <Media>
                                    <Media left>
                                        { notificationIcons.filter(ni => ni.type == notification.notificationType)[0].icon }
                                    </Media>
                                    <Media body>
                                        <span className="h6">
                                            { notification.notificationTypeName }
                                        </span>
                                        <p className="mt-2 mb-1" dangerouslySetInnerHTML={{ __html: notification.text }} />
                                    
                                        <div className="small mt-2">
                                            { moment(notification.generated).format('LLLL') }
                                        </div>
                                    </Media>
                                </Media>
                            </ListGroupItem>
                        ))
                    }
                    </ListGroup>
                </ExtendedDropdown.Section>

        <ExtendedDropdown.Section className="text-center" tag={ Link} to="/notifications">
            See All Notifications
            <i className="fa fa-angle-right fa-fw ml-2" />
        </ExtendedDropdown.Section>
    </ExtendedDropdown>
    </UncontrolledDropdown>
    <ToastContainer 
        position='top-right'
        type='default'
        autoClose={50000}
        draggable={false}
        hideProgressBar={true}
    />
 </>
)}

NavbarActivityFeed.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};

export { NavbarActivityFeed };
