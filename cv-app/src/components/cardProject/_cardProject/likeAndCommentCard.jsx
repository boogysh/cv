// import React, {useState} from "react";
import React, { useState, useEffect } from "react";
import like from "../../../assets/like.png";
import like2 from "../../../assets/like3.png";
import comment from "../../../assets/comment1.png";
import shareIcon from "../../../assets/share.png";
import { UseFetch2 } from "../../../hooks/useFetch2";
import Loader2 from "../../loader/Loader2";
import axios from "axios";
// import { UseAxios } from "../../../hooks/useForm/useAxios";

export default function LikeAndCommentCard(props) {
  const [ip, setIP] = useState("");
  // useEffect(() => {
  //   setIP("aabvf");
  // }, [ip]);
  // console.log("ip", ip);
  const [ipList, setIpList] = useState([]);
  const [liked, setLiked] = useState(false); //true or false
  // const [statePage, setStatePage] = useState(0);
  const [likesQty, setLikesQty] = useState(0);
  const [myIpList, setMyIpList] = useState([]);

  //-----------USE FETCH-------------------
  const { data2, isLoading } = UseFetch2(
    // `process.env.API_LIKES`,
    "https://cv-backend-git-main-boogysh.vercel.app/api/likes",
    // `http://localhost:4000/api/likes`,
    props.statePage // force fetch to refresh after liking or unliked !!!!!!!!!!!
  );
  //---------------------AXIOS-----------------------------------
  // const { isLoading_ip, ip } = UseAxios("https://geolocation-db.com/json/");
  //----------------------------------------------------------------
  //creating function to load ip address from the API
  const getDataIp = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    setIP(res.data.IPv4);
  };
  useEffect(() => {
    getDataIp();
  }, [ip]);

  //----------------SAVE MY-IP'S TO LOCAL STORAGE----------------------------
  useEffect(() => {
    const myIPs = [];
    const get_IPs = JSON.parse(localStorage.getItem("myIPs"));
    const dynamic_IP = ip;
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
  useEffect(() => {
    data2.filter((like) => {
      if (like.project === props.id) {
        setIpList(like.ipList);
        setLikesQty(like.likes);
      }
      return like.ipList && like.likes;
    });
  }, [data2, props.id]);
  //--------MANAGE LIKE ON LOAD PAGE------------------

  useEffect(() => {
    const FindIdenticalIp = ipList.filter((value) => myIpList.includes(value));
    const manageLike = () => {
      const ipListIncludesIp = ipList.includes(ip);
      ipListIncludesIp && setLiked(true);
      FindIdenticalIp.length > 0 && setLiked(true); //???? IT WORKS ????
      return;
    };
    manageLike();
  }, [ip, ipList, myIpList]);
  //-------LIKE-POST-CONTENT--------------
  const likeToPost = {
    project: `${props.id}`,
    ip: ip,
    allMyIPs: myIpList,
  };
  //------------------------------------
  console.log("myIpList:", myIpList);
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
        // setStatePage(statePage + 1);
        // props.setStatePage((props.statePage) => props.statePage + 1);
        props.setStatePage(props.statePage + 1);
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
          {/* {isLoading || isLoading_ip ? ( */}
          {isLoading ? (
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
