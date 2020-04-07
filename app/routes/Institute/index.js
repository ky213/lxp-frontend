import React from 'react';
import {
    Container,
    Card,    
    CardFooter,
    Col,
    Row,
    Table,
} from '@/components';

import { instituteService } from '@/services';
import { HeaderMain } from "@/routes/components/HeaderMain";
import { HeaderDemo } from "@/routes/components/HeaderDemo";
import InstituteSettings from './InstituteSettings';
import ListInstitutes from './ListInstitutes';
import { authenticationService } from '@/services';
import { Role } from '@/helpers';
import { useAppState } from '@/components/AppState';

const Institute = () => {
    const [{currentUser, selectedInstitute}, dispatch] = useAppState();

    const handleEdited = () => {
        //console.log("Handle edited!")

        
    }
    
 
    return (
        <React.Fragment>
            <Container>
                <HeaderMain title="Institute" />

                {!selectedInstitute && (
                    <Row> 
                        <Col lg={ 12 }>
                            <HeaderDemo 
                            title="Edit institute settings"
                            subTitle="You need to select an institute first" 
                            />
                        </Col>
                    </Row>
                )}
                {
                    selectedInstitute && (  
                        <InstituteSettings instituteId={selectedInstitute.instituteId} onEdited={handleEdited} />
                    )
                }

            </Container>
        </React.Fragment>
    );
};

export default Institute;