import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "@/components";
import { useAppState } from "@/components/AppState";
import { userService } from "@/services";
import { USER_CHANGE_PROFILE_PHOTO } from "@/actions";
import Avatar from "react-avatar-edit";
import styles from "./ProfilePhoto.css";
import ThemedButton from "@/components/ThemedButton";
import defaultUser from "@/images/avatars/default-user.png";

const ProfilePhoto = ({
  profilePhoto,
  enableEdit,
  userId,
  size,
  showEditButon = true,
  showProfilePhoto = true,
  profilePhotoUpdated
}) => {

  const [{ currentUser }, dispatch] = useAppState();

  const [imgClassName, setImgClassName] = React.useState(null);
  const [src, setSrc] = React.useState(null);
  const [pp, setPp] = React.useState(profilePhoto);
  const [preview, setPreview] = React.useState(null);
  const [
    showUpdateProfilePhotoModal,
    setShowUpdateProfilePhotoModal
  ] = React.useState(false);

  React.useEffect(() => {
    let imgCN = getImgSizeClassName(size);
    setImgClassName(imgCN);
  }, []);

  React.useEffect(() => {
    setPp(profilePhoto);
  }, [profilePhoto]);

  React.useEffect(() => {
    let imgCN = getImgSizeClassName(size);
    setImgClassName(imgCN);
  }, [size]);

  const getImgSizeClassName = size => {
    switch (size) {
      case "size32":
        return styles.size32;
      case "size64":
        return styles.size64;
      case "size92":
        return styles.size99;
      case "size128":
        return styles.size128;
      case "size192":
        return styles.size192;
      case "size256":
        return styles.size256;
    }
  };

  const onClose = event => {
    console.log("onClose");
    setPreview(null);
  };
  const onCrop = croppedImage => {
    setPreview(croppedImage);
  };

  const onBeforeFileLoad = loadedImage => {
    setSrc(loadedImage);
  };

  const updateProfilePhoto = () => {
    userService
      .updateProfilePhoto(userId, preview)
      .then(() => {
        setPp(preview);
        if (currentUser.user.userId == userId)
          dispatch({ type: USER_CHANGE_PROFILE_PHOTO, profilePhoto: preview });
        setShowUpdateProfilePhotoModal(false);
        profilePhotoUpdated();
      })
      .catch(error => {
        console.log("err", error);
      });
  };

  const handleProfilePhotoClick = () => {
    setEditUserPhoto(true);
  };
  const cancelUpdateProfilePhoto = () => {
    setEditUserPhoto(false);
  };
  const toggle = () => setModal(!modal);
  const showModal = () => {
    setShowUpdateProfilePhotoModal(true);
  };
  const hideModal = () => {
    setShowUpdateProfilePhotoModal(false);
  };

  return (
    <React.Fragment>
      {showProfilePhoto && (
        <img src={pp || defaultUser} className={imgClassName} />
      )}

      {enableEdit && showEditButon && (
        <div>
          <ThemedButton onClick={showModal} size="sm">
            Change profile photo
          </ThemedButton>
        </div>
      )}
      <Modal isOpen={showUpdateProfilePhotoModal} unmountOnClose={false}>
        <ModalHeader>Update profile photo</ModalHeader>
        <ModalBody style={{ overflow: "hidden" }}>
          <div align="center">
            <Avatar
              width={256}
              height={256}
              onCrop={onCrop}
              onClose={onClose}
              onBeforeFileLoad={onBeforeFileLoad}
              disableBoundaryChecks={false}
              style={{ overflow: "hidden" }}
              src={src}
            />
          </div>
        </ModalBody>

        <ModalFooter>
          <ThemedButton onClick={updateProfilePhoto}>Update</ThemedButton>
          <Button color="light" onClick={hideModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default ProfilePhoto;
