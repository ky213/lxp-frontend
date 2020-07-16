import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import styled from "styled-components";
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
    DropdownItem
} from '../../../../components';

const ColorCode = styled.section`
    width:15px;
    height:15px;
    background: ${props => props.color || '#fff'};
`;

const OrganizationLogo = styled.div`
    width:30px;
    height:30px;
    border-radius: 50%;
    overflow: hidden;
    color:${props => props.color || '#fff'};
    background-color: ${props => props.backgroundColor || '#1EB7FF'};
    background-image: url(${props => props.src || '' });
    background-size: cover;
    background-position: center center;
    border:3px solid ${props => props.backgroundColor || '#fff'};
`;

const OrganizationLogoGenerated = styled.div`
    width:30px;
    height:30px;
    border-radius: 50%;
    overflow: hidden;
    background-color: ${props => props.backgroundColor || '#1EB7FF'};
    text-align:center;
    color:${props => props.color || '#fff'};
    font-weight:bold;
    line-height:30px;
`;

const OrganizationRow = (props) => {

    return (
        <React.Fragment>
            <tr>
             <td className="align-middle">
                <CustomInput type="checkbox" id={`OrganizationRow-${ props.props.organizationId }` } label="" inline />
             </td>
             <td className="align-middle text-right">
                <Button type="button" color="link" onClick={() => props.onOrganizationEdit(props.props.organizationId)}>
                    <i className="fa fa-fw fa-pencil mr-2"></i>
                    Edit
                </Button>
            </td>
             <td className="align-middle">
                <a href="#">
                    
                    <ColorCode color={props.props.colorCode} />
                </a>
             </td>
                <td>
                    <Media>
                        <Media left className="d-flex align-self-center mr-3">
                            
                            {
                                props.props.logo && <OrganizationLogo color={props.props.colorCode} backgroundColor={props.props.backgroundColorCode} src={props.props.logo}/> ||
                                <OrganizationLogoGenerated color={props.props.colorCode} backgroundColor={props.props.backgroundColorCode}>
                                     {props.props.name[0].toUpperCase()}
                                </OrganizationLogoGenerated>
                            }
                         
                            
                        </Media>
                        <Media body>
                            <a className="mt-0 d-flex text-decoration-none" href="#">
                                {props.props.name}
                            </a>
                        </Media>
                    </Media>
                </td>
                <td className="align-middle">
                    <ColorCode color={props.props.colorCode} />  
                </td>
                <td className="align-middle">
                    <ColorCode color={props.props.backgroundColorCode} /> 
                </td>

            </tr>
        </React.Fragment>
    )
}
OrganizationRow.propTypes = {
    id: PropTypes.node
};
OrganizationRow.defaultProps = {
    id: "1"
};

export { OrganizationRow };
