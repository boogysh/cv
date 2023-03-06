import { useState, useEffect } from "react";

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
  const [isLoading_ip, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    async function fetchip() {
      try {
        const response = await fetch(url);
        const ip = await response.json();

        set_ip(ip);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchip();
  }, [url, state]);
  return { isLoading_ip, ip, error };
}
