import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import back from "../Img/back.svg";
import location_white from "../Img/location_white.svg";
import location_black from "../Img/location_black.svg";
import catfoot from "../Img/catfoot.svg";
import include from "../Img/include.svg";
import review from "../Img/review.svg";
import share from "../Img/share.svg";
import heart from "../Img/heart.svg";
import contact from "../Img/contact.svg";
import styles from "../css/spotdetailpage.module.css";
import axios from "axios";

const Header = styled.div`
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  display: flex;
  height: 40px;
  background-color: none;
`;

const SpotImage = styled.div`
  flex-direction: column;
  position: relative;
  display: flex;
  width: 100%;
  height: 300px;
  background: #c4c4c4;
`;

const Back = styled.div`
  padding-left: 20px;
  margin-right: auto;
`;

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
`;

const Spot = ({
  spotId,
  spotImage,
  spotName,
  spotCategory,
  spotReviewNum,
  spotGrade,
  spotAddress,
  spotContact,
  spotLink,
}) => {
  const [spots, setSpots] = useState({});

  useEffect(() => {
    const fetchSpot = async () => {
      try {
        const response = await axios.get(
          `http://43.203.208.221:8079/api/restaurant/details/${spotId}`
        );
        setSpots(response.data.data);
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    };
    fetchSpot();
  }, []);

  const SpotInfo1 = () => {
    return (
      <>
        <SpotImage>
          <img src={spotImage} alt="spotimage" />
        </SpotImage>
        <div className={styles.spotinfo1}>
          <div className={styles.categoryname}>{spotCategory}</div>
          <div className={styles.spotname}>{spotName}</div>
          <div className={styles.review}>
            <div className={styles.grade}>
              <img className={styles.catfoot} src={catfoot} alt="catfoot" />
              <img className={styles.catfoot} src={catfoot} alt="catfoot" />
              <img className={styles.catfoot} src={catfoot} alt="catfoot" />
              <img className={styles.catfoot} src={catfoot} alt="catfoot" />
              <img className={styles.catfoot} src={catfoot} alt="catfoot" />
            </div>
            <div className={styles.grade_num}>{spotGrade}</div>
            <Link to={`/review/${spotId}`} className={styles.review_num}>
              {spotReviewNum}개의 리뷰 &gt;
            </Link>
          </div>
        </div>
      </>
    );
  };

  const SpotInfo2 = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const modalBackground = useRef();
    const handleButtonClick = () => {
      setModalOpen(true);
    };

    const handleCloseModal = () => {
      setModalOpen(false);
    };

    const handleRadioChange = (event) => {
      setSelectedOption(event.target.value);
    };

    const handleSubmit = () => {
      // 여기에 선택된 라디오 버튼 값(selectedOption)을 이용한 작업을 수행할 수 있습니다.
      console.log("Selected option:", selectedOption);
      handleCloseModal();
    };

    const [mukatlist, setMukatlist] = useState([]);

    useEffect(() => {
      const fetchMukatlist = async () => {
        try {
          const response = await axios.get(
            `http://43.203.208.221:8079/api/groupmuckat`
          ); // 사용자 정보 추가 필요
          setMukatlist(response.data.data);
          console.log(response);
        } catch (e) {
          console.log(e);
        }
      };
      fetchMukatlist();
    }, [mukatlist]);

    const IncludeModal = () => {
      return (
        <>
          <div onClick={handleButtonClick} className={styles.include}>
            <img className={styles.spotinfo2_img} src={include} alt="include" />
            <div className={styles.spotinfo2_text}>먹킷리스트 담기</div>
          </div>
          {modalOpen && (
            <div
              className={styles.modal_container}
              ref={modalBackground}
              onClick={(e) => {
                if (e.target === modalBackground.current) {
                  setModalOpen(false);
                }
              }}
            >
              <div className={styles.modal_content}>
                <h2>먹킷리스트 목록</h2>
                <form onSubmit={handleSubmit}>
                  <label className={styles.radiobutton}>
                    <input
                      type="radio"
                      value="personal"
                      checked={selectedOption === "personal"}
                      onChange={handleRadioChange}
                    />
                    개인 먹킷리스트
                  </label>
                  <label className={styles.radiobutton}>
                    <input
                      type="radio"
                      value="group"
                      checked={selectedOption === "group"}
                      onChange={handleRadioChange}
                    />
                    그룹 먹킷 리스트
                  </label>
                  <div className={styles.button_select}>
                    <button
                      className={styles.button_cancel}
                      onClick={handleCloseModal}
                    >
                      취소
                    </button>
                    <button className={styles.button_ok} type="submit">
                      확인
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      );
    };

    return (
      <>
        <div className={styles.spotinfo2}>
          <table>
            <tr>
              <td>
                <IncludeModal />
              </td>
              <td>
                <Link to={`/reviewwrite/${spotId}`} className={styles.link}>
                  <img
                    className={styles.spotinfo2_img}
                    src={review}
                    alt="reivew"
                  />
                  <div className={styles.spotinfo2_text}>리뷰 작성</div>
                </Link>
              </td>
              <td>
                <Link className={styles.link} to="">
                  <img
                    className={styles.spotinfo2_img}
                    src={share}
                    alt="share"
                  />
                  <div className={styles.spotinfo2_text}>공유</div>
                </Link>
              </td>
              <td>
                <Link className={styles.link} to="">
                  <img
                    className={styles.spotinfo2_img}
                    src={heart}
                    alt="heart"
                  />
                  <div className={styles.spotinfo2_text}>마음함</div>
                </Link>
              </td>
            </tr>
          </table>
        </div>
      </>
    );
  };

  const Address = () => {
    return (
      <>
        <div className={styles.address}>
          <img
            className={styles.location_black}
            src={location_black}
            alt="location"
          />
          <div className={styles.address_detail}>{spotAddress}</div>
          <Link className={styles.copy} to="">
            복사
          </Link>
          <Link className={styles.mapbutton} to="">
            <div className={styles.map}>지도보기</div>
          </Link>
        </div>
      </>
    );
  };

  const Contact = () => {
    return (
      <>
        <div className={styles.contact}>
          <img className={styles.contact_img} src={contact} alt="contact" />
          <div className={styles.contact_detail}>{spotContact}</div>
          <Link to="" className={styles.call}>
            전화걸기
          </Link>
        </div>
      </>
    );
  };

  const Detail = () => {};

  <>
    {spotId &&
      spotId.map((spot) => (
        <div key={spot.spotId}>
          <SpotInfo1
            key={spot.spotId}
            spotImage={spot.spotImage}
            spotName={spot.spotName}
            spotCategory={spot.spotCategory}
            spotAddress={spot.spotAddress}
            spotContact={spot.spotContact}
            spotReviewnum={spot.ReviewNum}
            spotGrade={spot.spotGrade}
          />
          <div>
            <div className={styles.gap1} />
            <SpotInfo2 />
            <div className={styles.gap2} />
            <Address />
            <div className={styles.gap2} />
            <Contact />
            <div className={styles.gap2} />
            <Detail />
          </div>
        </div>
      ))}
  </>;
};

/*
const Location = () => {
  return (
    <>
      <div className={styles.location}>
        <img src={location_white} width="10px" alt="location"></img>
        <div style={{ padding: "3px" }}>800m</div>
      </div>
    </>
  );
};
 */

const SpotdetailPage = () => {
  const navigate = useNavigate();
  const onClickBack = () => {
    return navigate(-1);
  };

  const { spotId } = useParams();
  const [spotDetail, setSpotDetail] = useState({});

  useEffect(() => {
    const fetchSpotDetail = async () => {
      try {
        const response = await axios.get(
          `http://43.203.208.221:8079api/restaurant/${spotId}`
        );
        setSpotDetail(response.data.data);
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    };
    fetchSpotDetail();
  }, [spotId]);

  return (
    <>
      <Header>
        <Back>
          <div onClick={onClickBack}>
            <img src={back} alt="back" />
          </div>
        </Back>
      </Header>
      {spotDetail && (
        <Spot
          key={spotDetail.spotId}
          spotId={spotDetail.spotId}
          spotImage={spotDetail.spotImage}
          spotName={spotDetail.spotName}
          spotCategory={spotDetail.spotCategory}
          spotReviewNum={spotDetail.spotReviewNum}
          spotGrade={spotDetail.spotGrade}
          spotAddress={spotDetail.spotAddress}
          spotContact={spotDetail.spotContact}
          spotLink={spotDetail.spotLink}
        />
      )}
    </>
  );
};

export default SpotdetailPage;
