import React, { Fragment } from "react";
import { Avatar, Media } from "@/components";
import styled from "styled-components";
import defaultUser from "@/images/avatars/default-user.png";
import { useSwipeable, Swipeable } from "react-swipeable";
import moment from "moment";

const MobileRotationHeader = styled.div`
  background-color: white;
  padding: 15px 15px;
  color: #2D3965;
  font-weight: bold;
`;

const MobileRotationRow = styled.div`
  margin: 0px 0px 0px 0px;
  padding: 15px 15px;
`;

const SubSpec = styled.span`
  margin-bottom: 3px;
  padding: 1rem;
  border-radius: 0.15rem;
  display: inline-block;
  color: ${props => props.color || "#000"};
  background: ${props => props.bgColor || "#fafafa"};
  border-color: ${props => props.bgColor || "#fafafa"};
`;

const ContentMobile = ({ rotationData, toggleRotationDetails }) => {
  const [currentBlockIdx, setCurrentBlockIdx] = React.useState(null);

  React.useEffect(() => {
    const currentBlock = rotationData.blocks.find(h =>
      moment().isBetween(moment(h.start_date), moment(h.end_date), null, "[]")
    );
    if (currentBlock) {
      let x = rotationData.blocks.indexOf(currentBlock);
      if (x >= 0)
        setCurrentBlockIdx({ selectedBlockIdx: x, currentBlockIdx: x });
    } else {
      setCurrentBlockIdx({ selectedBlockIdx: 0, currentBlockIdx: -1 });
    }
  }, []);

  const swipeLeft = () => {
    if (currentBlockIdx.selectedBlockIdx < rotationData.blocks.length - 1)
      setCurrentBlockIdx({
        ...currentBlockIdx,
        selectedBlockIdx: currentBlockIdx.selectedBlockIdx + 1
      });
  };

  const swipeRight = () => {
    if (currentBlockIdx.selectedBlockIdx > 0)
      setCurrentBlockIdx({
        ...currentBlockIdx,
        selectedBlockIdx: currentBlockIdx.selectedBlockIdx - 1
      });
  };

  return (
    <Fragment>
      {console.log("###", rotationData, currentBlockIdx)}
      <Swipeable onSwipedLeft={swipeLeft} onSwipedRight={swipeRight}>
        {rotationData &&
          currentBlockIdx != null &&
          currentBlockIdx.selectedBlockIdx >= 0 && (
            <Fragment>
              <MobileRotationHeader>
                {rotationData.blocks[currentBlockIdx.selectedBlockIdx].name}
              </MobileRotationHeader>
              <div className="rotations-container">
                {rotationData &&
                  rotationData.timetableData.map((ed, idx) => {
                    let tt = ed.timetable.find(
                      t =>
                        t.block_id ==
                        rotationData.blocks[currentBlockIdx.selectedBlockIdx]
                          .block_id
                    );
                    let ss;
                    if (tt) {
                      ss = rotationData.subspecialities.find(
                        s => s.subspeciality_id == tt.subspeciality_id
                      );
                    }

                    let bgColorPrimary = "#2D3965";
                    let bgColorAlternative = "#414D72";

                    if (
                      currentBlockIdx.selectedBlockIdx !=
                      currentBlockIdx.currentBlockIdx
                    ) {
                      bgColorPrimary = "#F1F1F9";
                      bgColorAlternative = "#F8FCFC";
                    }

                    return (
                      <MobileRotationRow
                        style={{
                          backgroundColor:
                            idx % 2 == 0 ? bgColorPrimary : bgColorAlternative
                        }}
                      >
                        {ss && (
                          <Fragment>
                            <Media style={{ lineHeight: "30px" }}>
                              <Media
                                left
                                className="d-flex align-self-center mr-3"
                              >
                                <Avatar.Image
                                  src={ed.profilePhoto || defaultUser}
                                  className="align-self-center"
                                />
                              </Media>
                              <Media body>{ed.residentName}</Media>
                            </Media>
                            <SubSpec
                              id={tt.rotation_id}
                              className="text-center"
                              onClick={() =>
                                toggleRotationDetails(tt.rotation_id)
                              }
                              bgColor={ss.bg_color}
                              color={ss.color}
                            >
                              {ss.name}
                            </SubSpec>
                            <div style={{ fontSize: "0.8rem" }}>
                              {
                                rotationData.blocks[
                                  currentBlockIdx.selectedBlockIdx
                                ].name
                              }
                            </div>
                          </Fragment>
                        )}
                      </MobileRotationRow>
                    );
                  })}
              </div>
            </Fragment>
          )}
      </Swipeable>
    </Fragment>
  );
};

export default ContentMobile;
