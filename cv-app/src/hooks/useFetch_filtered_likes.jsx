import { useState, useEffect } from "react";
import axios from "axios";
import { IP } from "./../redux/action";
import { useDispatch } from "react-redux";

export function UseFetch_filtered_likes(url, id, statePage) {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [ipList, setIpList] = useState([]);
  const [likesQty, setlikesQty] = useState(0);
  const [ip, setIp] = useState("");
  //-----------------------------------------
  // const { storedIp } = useSelector((state) => state.cardReducer);
  const dispatch = useDispatch();

  //-----------------------------------------------
  const onLine = window.navigator.onLine

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        //-----------------
        const res = await axios.get("https://geolocation-db.com/json/");
        // setIp(`${res.data.IPv4}---6`);
        onLine && setIp(res.data.IPv4);
        //--------
        dispatch(IP(res.data.IPv4))
        // dispatch(IP(`${res.data.IPv4}---6`))
        //-------------------
        data.filter((like) => {
          if (like.project === id) {
            setIpList(() => like.ipList);
            setlikesQty(() => like.likes);
          }
          return like.pList && like.likes;
        });
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    // dispatch(IP(ip));
  }, [url, id, statePage, dispatch, ip, onLine]);
  return { isLoading, error, ipList, likesQty, ip };
}
