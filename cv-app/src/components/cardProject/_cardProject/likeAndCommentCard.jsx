// import React, {useState} from "react";
import React, { useState, useEffect, useMemo } from "react";
import like from "../../../assets/like.png";
import like2 from "../../../assets/like3.png";
import comment from "../../../assets/comment1.png";
import shareIcon from "../../../assets/share.png";
// import { UseFetch2 } from "../../../hooks/useFetch2";
import { UseFetch_filtered_likes } from "../../../hooks/useFetch_filtered_likes";
import Loader2 from "../../loader/Loader2";
import axios from "axios";

export default function LikeAndCommentCard(props) {
  const [ip, setIP] = useState("");
  // useEffect(() => {
  //   setIP("aabvf");
  // }, [ip]);
  // console.log("ip", ip);
  // const [ipList, setIpList] = useState([]);
  // const [ipList] = useState([]);
  const [liked, setLiked] = useState(false); //true or false
  const [statePage, setStatePage] = useState(0);
  const [myIpList, setMyIpList] = useState([]);
  const [isLoading_Identical_Ip, setIsLoading_Identical_Ip] = useState(false);
  //-----------USE FETCH-------------------
  const { ipList, likesQty, isLoading } = UseFetch_filtered_likes(
    // `process.env.API_LIKES`,
    // `http://localhost:4000/api/likes`,
    `https://cv-backend-git-main-boogysh.vercel.app/api/likes`,
    props.id,
    statePage //refresh after liking or unliked !!!!!!!!!!!
  );
  // console.log(ipList)
  //---------------------AXIOS-----------------------------------
  // const { isLoading_ip, ip } = UseAxios("https://geolocation-db.com/json/");
  // const { ip } = UseAxios();
  //----------------------------------------------------------------
  const getDataIp = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    setIP(res.data.IPv4);
  };
  useEffect(() => {
    getDataIp();
  }, []);
  //----------------SAVE MY-IP'S TO LOCAL STORAGE----------------------------

  useMemo(() => {
    const myIPs = [];
    const dynamic_IP = ip;
    const get_IPs = JSON.parse(localStorage.getItem("myIPs"));
    if (!get_IPs) {
      return localStorage.setItem("myIPs", JSON.stringify(myIPs));
    } else if (!get_IPs.includes(dynamic_IP)) {
      myIPs.push(get_IPs);
      dynamic_IP !== "" && myIPs.push(dynamic_IP);
      return (
        myIPs && localStorage.setItem("myIPs", JSON.stringify(myIPs.flat()))
      );
    }
    setMyIpList(JSON.parse(localStorage.getItem("myIPs")));
  }, [ip]);

  // console.log("test2-10");
  //------------- FILTER LIKES API-----------------------

  //--------MANAGE LIKE ON LOAD PAGE------------------
  useMemo(() => {
    const FindIdenticalIp = ipList.filter((value) => myIpList.includes(value));
    const ipListIncludesIp = ipList.includes(ip);
    ipListIncludesIp && setLiked(true);
    //FindIdenticalIp.length > 0 && setLiked(true); //???? IT WORKS ????
    //-------------------------------------------------------------------

    // if (FindIdenticalIp.length > 0) return setLiked(true);
    // else if (FindIdenticalIp.length === 0) return setLiked(false);
    // setStatePage((statePage) => statePage + 1);
    //--------------------
    if (!FindIdenticalIp) return;
    setIsLoading_Identical_Ip(true);
    try {
      FindIdenticalIp.length > 0 && setLiked(true);
      FindIdenticalIp.length === 0 && setLiked(false);
      ipListIncludesIp && setLiked(true);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading_Identical_Ip(false);
    }
  }, [ip, ipList, myIpList]);
  //---------------------------------------------------

  // //-------LIKE-POST-CONTENT-------------------------
  const likeToPost = {
    project: `${props.id}`,
    ip: ip,
    allMyIPs: myIpList,
  };
  //------------------------------------
  // console.log("myIpList:", myIpList);
  //------------------------------------
  const likePost = () => {
    if (ip && props.id && myIpList) {
      const fetchLikePost = fetch(
        //`process.env.API_LIKES`,
        "https://cv-backend-git-main-boogysh.vercel.app/api/likes",
        // "http://localhost:4000/api/likes/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(likeToPost),
        }
      );
      const cleanAndRefresh = async () => {
        await fetchLikePost;
        setLiked(!liked);
        setStatePage(statePage + 1);
        // setStatePage((statePage) => statePage + 1);
      };
      cleanAndRefresh();
      // } else return console.log("Something went wrong!");
    } else return;
  };
  //------------------------------------
  return (
    <div className="likeAndComment_container">
      <div className="likeAndComment_result">
        <div className="likeAndComment_qty">
          <img src={like} className="card_icon_small" alt="like" />{" "}
          <span className="likesNr">{likesQty}</span>
        </div>
        <button
          onClick={props.openAllComments}
          className="likeAndComment_qty likeAndComment_qty_comments"
        >
          Commentaires {props.commentsQty}
        </button>
      </div>
      <div className="separe_likes"></div>
      <div className="likeAndComment_add">
        <button onClick={likePost} className="likeAndComment_btn">
          {isLoading || isLoading_Identical_Ip ? (
            <Loader2 />
          ) : (
            <>
              <img
                src={liked ? like2 : like}
                className="card_icon card_icon_like"
                alt="like"
              />
              <span className="likesNr">J'aime</span>
            </>
          )}
        </button>
        <button onClick={props.openComments} className="likeAndComment_btn">
          <img src={comment} className="card_icon comment_icon" alt="like" />
          <span className="likesNr">Commenter</span>
        </button>
        <button onClick={props.openShareList} className="likeAndComment_btn">
          <img src={shareIcon} className="card_icon" alt="share icon" />
          <span className="likesNr">Distribuer</span>
        </button>
      </div>
    </div>
  );
}
