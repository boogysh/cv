// import React, {useState} from "react";
import React, { useState, useEffect } from "react";
import like from "../../../assets/like.png";
import like2 from "../../../assets/like3.png";
import comment from "../../../assets/comment1.png";
import shareIcon from "../../../assets/share.png";
import { UseFetch_filtered_likes } from "../../../hooks/useFetch_filtered_likes";
import Loader2 from "../../loader/Loader2";
// import axios from "axios";

// import { useSelector  } from "react-redux";

export default function LikeAndCommentCard(props) {
  const [ip, setIp] = useState("");
  useEffect(()=>{
    setIp('ooooo')
  },[])
  const [liked, setLiked] = useState(false); //true or false
  const [myIpList, setMyIpList] = useState([]);

  const [statePage, setStatePage] = useState(0);
  //-----------USE FETCH-------------------
  const { isLoading, ipList } = UseFetch_filtered_likes(
    // `http://localhost:4000/api/likes`,
    `https://cv-back-git-main-boogysh.vercel.app/api/likes`,
    props.id,
    statePage //refresh after liking or unliked !!!!!!!!!!!
  );
  console.log("liked", liked);
  //--------------------------AXIOS---------------------------------------------
  // async function getIp() {
  //   const res = await axios.get("https://geolocation-db.com/json/");
  //   res && setIp(res.data.IPv4);
  // }
  // useEffect(() => {
  //   getIp();
  // }, []);

  //----------------SAVE MY-IP'S TO LOCAL STORAGE----------------------------

  useEffect(() => {
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
  //--------MANAGE LIKE ON LOAD PAGE------------------

  useEffect(() => {
    const FindIdenticalIp = ipList.filter((value) => myIpList.includes(value));
    const ipListIncludesIp = ipList.includes(ip);
    ipListIncludesIp && setLiked(true);
    FindIdenticalIp.length > 0 && setLiked(true);
    console.log("isFindIdenticalIp ", FindIdenticalIp);
    console.log("ipListIncludesIp ", ipListIncludesIp);
  }, [ip, ipList, myIpList]);

  // //-------LIKE-POST-CONTENT------------------------
  const likeToPost = {
    project: `${props.id}`,
    ip: ip,
    allMyIPs: myIpList,
  };
  //------------------------------------
  const likePost = () => {
    if (ip && props.id && myIpList) {
      const fetchLikePost = fetch(
        //`process.env.API_LIKES`,
        "https://cv-back-git-main-boogysh.vercel.app/api/likes",
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
        setStatePage((statePage) => statePage + 1);
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
          <span className="likesNr">{ipList.length}</span>
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
