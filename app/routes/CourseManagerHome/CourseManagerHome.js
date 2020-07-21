import React from 'react';
import { Link } from 'react-router-dom';

import { 
    Container,
    Row,
    Col,
    Card,
    ButtonGroup,
    Button,
    CardBody,
    CardTitle,
    CardFooter,
    CardGroup,
    Table,
    TabPane,
    Badge,
    Nav,
    NavItem,
    UncontrolledTabs
} from '@/components';
import { HeaderMain } from "@/routes/components/HeaderMain";

import { Profile } from "@/routes/components/Profile";

import { DlRowContacts } from "@/routes/components/Profile/DlRowContacts";
import { DlRowAddress } from "@/routes/components/Profile/DlRowAddress";

import { useAppState, AppStateContext } from '@/components/AppState';

const CourseManagerHome = () => {
    const [{currentUser}, dispatch] = useAppState();
    const user = currentUser && currentUser.user;

    return user && (<React.Fragment>
        <Container>
            <HeaderMain
                title={`Hello, ${user.fullName}`}
                className="mb-5 mt-4"
            />        
            {/*<Announcement />*/}
            <br/>
            { /* START Content */}
            <Row>
                <Col lg={ 4 }>
                    <Card>
                        <CardBody>
                            <Profile selectedUser={user} tag={ Link } to="/user/profile" />
                        </CardBody>
                    </Card>
                </Col>                
            </Row>
            <br/>
            <Row>
                <Col lg={ 12 }>
                    <UncontrolledTabs initialActiveTabId="contact">
                        { /* START Pills Nav */}
                        <Nav pills className="mb-4 flex-column flex-md-row mt-4 mt-lg-0">
                            <NavItem>
                                <UncontrolledTabs.NavLink tabId="contact">
                                    Contact
                                </UncontrolledTabs.NavLink>
                            </NavItem>
                        </Nav>
                        { /* END Pills Nav */}
                        <UncontrolledTabs.TabContent>
                            <TabPane tabId="supervisors">
                                <Card body>
                                    <div className="mb-2">
                                        <span className="small">Contact</span>
                                    </div>
                                    <DlRowContacts 
                                    leftSideClassName="text-lg-right"
                                    rightSideClassName="text-inverse"
                                    />
                                    <div className="mt-4 mb-2">
                                        <span className="small">Address</span>
                                    </div>
                                    <DlRowAddress 
                                        leftSideClassName="text-lg-right"
                                        rightSideClassName="text-inverse"
                                    />
                                </Card>
                            </TabPane>
                           
                            <TabPane tabId="contact">
                                <Card body>
                                    <div className="mb-2">
                                        <span className="small">Contact</span>
                                    </div>
                                    <DlRowContacts selectedUser={user}
                                        leftSideClassName="text-lg-right"
                                        rightSideClassName="text-inverse"
                                        />
                                    <div className="mt-4 mb-2">
                                        <span className="small">Address</span>
                                    </div>
                                    <DlRowAddress 
                                        leftSideClassName="text-lg-right"
                                        rightSideClassName="text-inverse"
                                    />
                                    
                                    
                                </Card>
                            </TabPane>
                        </UncontrolledTabs.TabContent>
                    </UncontrolledTabs>
                </Col>
            </Row>
            { /* END Content */}
            
        </Container>
    </React.Fragment>
    ) || null;
}

export default CourseManagerHome;