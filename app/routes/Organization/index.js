import React from 'react';
import {
    Container,
    Card,    
    CardFooter,
    Col,
    Row,
    Table,
} from '@/components';

import { organizationService } from '@/services';
import { HeaderMain } from "@/routes/components/HeaderMain";
import { HeaderDemo } from "@/routes/components/HeaderDemo";
import OrganizationSettings from './OrganizationSettings';
import ListOrganizations from './ListOrganizations';
import { authenticationService } from '@/services';
import { Role } from '@/helpers';
import { useAppState } from '@/components/AppState';

const Organization = () => {
    const [{currentUser, selectedOrganization}, dispatch] = useAppState();

    const handleEdited = () => {
        //console.log("Handle edited!")

        
    }
    
 
    return (
        <React.Fragment>
            <Container>
                <HeaderMain title="Organization" />

                {!selectedOrganization && (
                    <Row> 
                        <Col lg={ 12 }>
                            <HeaderDemo 
                            title="Edit organization settings"
                            subTitle="You need to select an organization first" 
                            />
                        </Col>
                    </Row>
                )}
                {
                    selectedOrganization && (  
                        <OrganizationSettings organizationId={selectedOrganization.organizationId} onEdited={handleEdited} />
                    )
                }

            </Container>
        </React.Fragment>
    );
};

export default Organization;