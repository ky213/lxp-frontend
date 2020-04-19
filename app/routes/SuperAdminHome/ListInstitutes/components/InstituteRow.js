import React from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useAppState } from "@/components/AppState";
import { SUPER_ADMIN_SELECT_INSTITUTE } from "@/actions";
import { Consumer } from "@/components/Theme/ThemeContext";

import { Media, CustomInput, UncontrolledTooltip, Button } from "@/components";

const ColorCode = styled.section`
  width: 15px;
  height: 15px;
  background: ${(props) => props.color || "#fff"};
`;

const InstituteLogo = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  color: ${(props) => props.color || "#fff"};
  background-color: ${(props) => props.backgroundColor || "#1EB7FF"};
  background-image: url(${(props) => props.src || ""});
  background-size: cover;
  background-position: center center;
  border: 3px solid ${(props) => props.backgroundColor || "#fff"};
`;

const InstituteLogoGenerated = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${(props) => props.backgroundColor || "#1EB7FF"};
  text-align: center;
  color: ${(props) => props.color || "#fff"};
  font-weight: bold;
  line-height: 30px;
`;

const InstituteRow = (props) => {
  const intl = useIntl();
  const [{currentUser, selectedInstitute}, dispatch] = useAppState();

  return (
    <Consumer>
      {(themeState) => (
        <React.Fragment>
          <tr>
            <td className="align-middle text-right">
              {props.props.isActive && (
                <>
                  <CustomInput
                    type="checkbox"
                    className="p-1"
                    onChange={(e) => props.onSelected(e, props.props)}
                    id={`InstituteRow-${props.props.instituteId}`}
                    label=""
                    inline
                  />
                  <Button
                    type="button"
                    id={`InstituteRowSelect-${props.props.instituteId}`}
                    color="link"
                    onClick={() => {
                      dispatch({
                        type: SUPER_ADMIN_SELECT_INSTITUTE,
                        selectedInstitute: props.props,
                      });
                      themeState.onChangeTheme({
                        backgroundColor: props.props.backgroundColorCode,
                        foregroundColor: props.props.colorCode,
                        instituteLogo: props.props.logo,
                        instituteName: props.props.name,
                      });
                    }}
                  >
                    <i className="fa fa-fw fa-cog mr-2"></i>
                    {intl.formatMessage({
                      id: "General.Select",
                    })}
                  </Button>
                  <UncontrolledTooltip
                    placement="bottom"
                    target={`InstituteRowSelect-${props.props.instituteId}`}
                  >
                    {intl.formatMessage({
                      id: "SuperAdminHome.InstituteRow.SelectThis1",
                    })}
                  </UncontrolledTooltip>
                </>
              )}

              <Button
                type="button"
                color="link"
                onClick={() => props.onInstituteEdit(props.props.instituteId)}
              >
                {/*<i className="fa fa-fw fa-edit mr-2"></i>*/}
                <i className="fa fa-fw fa-pencil mr-2"></i>
                  {intl.formatMessage({
                      id: "General.Edit",
                    })}
              </Button>
            </td>

            <td>
              <Media>
                <Media left className="d-flex align-self-center mr-3">
                  {(props.props.logo && (
                    <InstituteLogo
                      color={props.props.colorCode}
                      backgroundColor={props.props.backgroundColorCode}
                      src={props.props.logo}
                    />
                  )) || (
                    <InstituteLogoGenerated
                      color={props.props.colorCode}
                      backgroundColor={props.props.backgroundColorCode}
                    >
                      {props.props.name[0].toUpperCase()}
                    </InstituteLogoGenerated>
                  )}
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
            <td className="align-middle">
              {(props.props.isActive && "Active") || "Inactive"}
            </td>
          </tr>
        </React.Fragment>
      )}
    </Consumer>
  );
};
InstituteRow.propTypes = {
  id: PropTypes.node,
};
InstituteRow.defaultProps = {
  id: "1",
};

export { InstituteRow };
