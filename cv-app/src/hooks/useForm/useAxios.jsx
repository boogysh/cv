import { useState, useEffect } from "react";
import axios from "axios";

export function UseAxios(url, state) {
  //-----------------------------------
  //---------------------AXIOS-----------------------------------
  //creating function to load ip address from the API
  // const getDataIp = async () => {
  //   const res = await axios.get("https://geolocation-db.com/json/");
  //   setIP(res.data.IPv4);
  // };
  // useEffect(() => {
  //   getDataIp();
  // }, [ip]);
  //-----------------------------------
  const [ip, set_ip] = useState([]);
  const [isLoading_ip, setLoading_ip] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!url) return;
    setLoading_ip(true);
    async function fetchip() {
      try {
        const res = await axios.get(url); //"https://geolocation-db.com/json/"
        set_ip(res.data.IPv4);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading_ip(false);
        
      }
    }
    fetchip();
  }, [url, ip, state]);
  return { isLoading_ip, ip, error };
}
