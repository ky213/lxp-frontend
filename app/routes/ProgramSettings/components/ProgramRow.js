import React from 'react';
import styled from "styled-components";
import moment from 'moment';
import {
    CustomInput,
    Button
} from '@/components';

const ColorCode = styled.section`
    width:15px;
    height:15px;
    background: ${props => props.color || '#fff'};
`;

const InstituteLogo = styled.div`
    width:30px;
    height:30px;
    border-radius: 50%;
    overflow: hidden;
    background-color: ${props => props.color || '#fff'};
    background-image: url(${props => props.src || ''});
    background-size: cover;
    background-position: center center;
    border:3px solid ${props => props.color || '#fff'};
`;

const InstituteLogoGenerated = styled.div`
    width:30px;
    height:30px;
    border-radius: 50%;
    overflow: hidden;
    background-color: ${props => props.color || '#fff'};
    text-align:center;
    color:#fff;
    font-weight:bold;
    line-height:30px;
`;

const ProgramRow = (props) => {

    return (
        <React.Fragment>
            <tr>
                <td className="align-middle">
                    <CustomInput type="checkbox" onClick={(e) => props.onSelected(props.props.programId, e)} id={`InstituteRow-${props.props.programId}`} label="" inline />
                </td>
                <td className="align-middle">
                    {props.props.name}
                </td>
                <td className="align-middle">
                    {props.props.programDirectors && props.props.programDirectors.map(pd => pd.name).join(', ')}
                </td>
                <td className="align-middle">
                    {props.props.academicLastMonth && moment(props.props.academicLastMonth).format("L")}
                </td>
                <td className="align-middle text-right">
                    <Button type="button" color="link" onClick={() => props.onProgramEdit(props.props.programId)}>
                        <i className="fa fa-fw fa-pencil mr-2"></i>
                        Edit
                </Button>
                </td>
            </tr>
        </React.Fragment>
    )
}


export { ProgramRow };
