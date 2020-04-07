import React from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Card,
  CardBody,
  Media,
  FormGroup,
  Label,
  Row
} from "@/components";
import { HeaderMain } from "@/routes/components/HeaderMain";
import { userService } from "@/services";
import { useAppState } from "@/components/AppState";
import ProfilePhoto from "@/components/ProfilePhoto";
import { Consumer } from "@/components/Theme/ThemeContext";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ThemedButton from "@/components/ThemedButton";
import { Role } from "@/helpers";
import { Loading } from "@/components";
import UserProfileNav from "./UserProfileNav";
import ProfileDetails from "./ProfileDetails";
import AccountDetails from "./AccountDetails";

const UserProfile = props => {
  const [{ currentUser }, dispatch] = useAppState();
  let history = useHistory();
  const queryParams = useParams();
  const [user, setUser] = React.useState(null);
  const [editUserPhoto, setEditUserPhoto] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState(null);

  React.useEffect(() => {
    getUserData();
  }, []);

  React.useEffect(() => {}, [user]);

  React.useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  React.useEffect(() => {}, [editUserPhoto]);

  const getUserData = () => {
    let employeeId = "";
    if (queryParams && queryParams.id) employeeId = queryParams.id;
    else employeeId = currentUser.user.employeeId;

    if (employeeId) {
      userService.getByEmployeeId(employeeId).then(data => {
        setUser(data);
      });
    } else if (currentUser.user && currentUser.user.userId) {
      userService.getByUserId(currentUser.user.userId).then(data => {
        setUser(data);
      });
    }
  }

  const profilePhotoUpdated = () => {
    getUserData();
  }

  return (
    <Container>
      {(user && (
        <React.Fragment>
          <Row className="mt-5">
            <Col lg={12}>
              <div className="media">
                <div className="mr-3 align-self-center media-left media-middle">
                  <ProfilePhoto
                    profilePhoto={user.profilePhoto}
                    enableEdit={true}
                    userId={user.userId}
                    size="size64"
                    showEditButon={false}                    
                  />
                </div>
                <div className="media-body">
                  
                  <h3>{user.surname + " " + user.name}</h3>
                  
                  <ProfilePhoto
                    enableEdit={true}
                    userId={user.userId}
                    size="size64"
                    showEditButon={true}
                    showProfilePhoto={false}
                    profilePhotoUpdated={profilePhotoUpdated}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={3}>
              <div className="mb-4">
                <UserProfileNav
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                />
              </div>
            </Col>
            <Col lg={9}>
              {user && (!selectedTab || selectedTab == "profileDetails") && (
                <ProfileDetails currentUser={currentUser} user={user} getUserData={getUserData} />
              )}

              {user && selectedTab == "accountDetails" && <AccountDetails currentUser={currentUser} user={user} setSelectedTab={setSelectedTab} />}
            </Col>
          </Row>
        </React.Fragment>
      )) || <Loading />}
    </Container>
  );
};

export default UserProfile;
