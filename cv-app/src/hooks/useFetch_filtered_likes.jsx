import { useState, useEffect } from "react";

export function UseFetch_filtered_likes(url, id, statePage) {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [ipList, setIpList] = useState([]);
  const [likesQty, setlikesQty] = useState(0);

  // useMemo(() => {
  //   data2.filter((like) => {
  //     if (like.project === props.id) {
  //       setIpList(() => like.ipList);
  //       setLikesQty(() => like.likes);
  //     }
  //     // return like;
  //     return like.ipList && like.likes;
  //   });
  // }, [data2, props.id]);

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
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
  }, [url, id, statePage]);
  return { isLoading, error, ipList, likesQty };
}
