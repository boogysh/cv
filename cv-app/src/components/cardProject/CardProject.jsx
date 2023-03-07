import React, { useState, useEffect } from "react";
import DefaultImage from "../../assets/imgDefault.png"; //?????
import "./cardProject.css";
import Slider from "../slider/Slider";
import { UseFetch } from "../../hooks/useFetch";
import LikeAndCommentCard from "./_cardProject/likeAndCommentCard";
import ShareList from "../shareButton/shareList";
import LinkToProjectDev from "./_cardProject/linkToProjectDev";
import LinkToProjectArchOrBat from "./_cardProject/linkToProjectArchOrBat";
import NewComment from "./_cardProject/newComment";
import NewCommentAndLastTwo from "./_cardProject/newCommentAndLastTwo";
import ShowAllComments from "./_cardProject/showAllComments";

function CardProject({ images, title, info, id, urlProject, urlExistent }) {
  const [uri, setUri] = useState();
  const [showNewCommentAndLastTwo, setShowNewCommentAndLastTwo] =
    useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [showShareList, setShowhareList] = useState(false);
  //-----------
  const [commentsQty, setCommentsQty] = useState(0);
  const [statePage, setStatePage] = useState(0);
  const [filteredComments, setFilteredComments] = useState([]);
  //------------------------------------------------------------------
  useEffect(() => {
    const href_arch = window.location.href.includes("/architecture");
    const href_bat = window.location.href.includes("/batiment");
    const href_dev = window.location.href.includes("/developpement");
    href_arch && setUri("architecture");
    href_bat && setUri("batiment");
    href_dev && setUri("developpement");
  }, []);
  //---------------------FETCH---------------------------------
  const { data, isLoading } = UseFetch(
    // `http://localhost:4000/api/comments`,
    // `process.env.API_COMMENTS`,
    `https://cv-backend-git-main-boogysh.vercel.app/api/comments`,
    statePage // force fetch to refresh after sending a comment and openComments
  );
  //---------- COMMENTS QUANTITY------------------------
  useEffect(() => {
    const result = data.filter((comment) => comment.project === id);
    setCommentsQty(result.length);
    setFilteredComments(result);
  }, [data, id]);
  //----OPEN AND CLOSE SHARE LIST---------
  const openShareList = () => {
    //open and close Like card
    setShowhareList(true);
    //close Share after a few seconds
    const timeout = setTimeout(() => {
      setShowhareList(false);
    }, 5000);
    return () => clearTimeout(timeout);
  };
  const closeShareList = () => {
    setShowhareList(false);
  };
  const openComments = () => {
    // Open and close  a few comments----
    setShowNewCommentAndLastTwo(true);
    setStatePage((statePage) => statePage + 1);
  };
  const closeComments = () => {
    setShowNewCommentAndLastTwo(false);
    setShowAllComments(false);
  };
  // Open and close all comments
  const openAllComments = () => {
    setShowNewCommentAndLastTwo(true);
    setShowAllComments(true);
  };

  //------------------
  return (
    <div className="card_wrapper">
      <div className="card" id={id}>
        <div className="card_img_container">
          <div className="slider_wrapper">
            <Slider slides={images} />
          </div>
          <LikeAndCommentCard
            id={id}
            openShareList={openShareList}
            openAllComments={openAllComments}
            openComments={openComments}
            commentsQty={commentsQty}
          />
        </div>
        {(uri === "architecture" || uri === "batiment") && (
          <LinkToProjectArchOrBat
            uri={uri}
            id={id}
            show_shareList={showShareList}
            show_newCommentAndLastTwo={showNewCommentAndLastTwo}
            info={info}
            title={title}
          />
        )}
        {uri === "developpement" && (
          <LinkToProjectDev
            title={title}
            info={info}
            id={id}
            urlProject={urlProject}
            urlExistent={urlExistent}
            show_shareList={showShareList}
            show_newCommentAndLastTwo={showNewCommentAndLastTwo}
          />
        )}
      </div>
      <ShareList
        title={title}
        id={id}
        url={`${window.location.href}#${id}`}
        show_shareList={showShareList}
        closeShareList={closeShareList}
      />
      <div // -----------------COMMENTS---------------
        className={
          showNewCommentAndLastTwo
            ? "card_comments_container"
            : "card_comments_container hidden"
        }
      >
        <NewComment
          id={id}
          closeComments={closeComments}
          setStatePage={setStatePage}
          statePage={statePage}
        />
        <NewCommentAndLastTwo
          show_newCommentAndLastTwo={showNewCommentAndLastTwo}
          filteredComments={filteredComments}
          isLoading={isLoading}
        />
        <ShowAllComments
          show_allComments={showAllComments}
          openAllComments={openAllComments}
          filteredComments={filteredComments}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
export default CardProject;

CardProject.defaultProps = {
  image: DefaultImage,
  info: ["Info"],
};
