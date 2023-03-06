const LIKE = require("../models/like");

exports.createLike = (req, res) => {
  const { project, ip, My_IPs } = req.body;
  const newLike = new LIKE({ project, ipList: ip, likes: 1 });
  console.log("6-ip:", ip);
  
  const allMyIPs = My_IPs ;

  // const allMyIPs = [];
  // allMyIPs.push(My_IPs);

  // allMyIPs.push(My_IPs);
  // !allMyIPs.includes(ip) && allMyIPs.push(ip);
  // if (!My_IPs.includes(ip)) {
  //   allMyIPs.push(ip);
  // }
  console.log("allMyIPs", allMyIPs);

  ////////////////////////////////////////////////////////////////
  const FindIdenticalElements = (array1, array2, array3) => {
    for (let i = 0; i < array1.length; i++) {
      for (let j = 0; j < array2.length; j++) {
        if (array1[i] === array2[j]) {
          array3.push(array1[i]);
        }
      }
    }
    return array3;
  };
  // FindIdenticalElements(array1, array2, array3) // use in Project
  ////////////////////////////////////////////////////////////////////
  const DeleteIdenticalElements = (array1, array2, array3) => {
    for (let i = 0; i < array1.length; i++) {
      for (let j = 0; j < array2.length; j++) {
        if (array1[i] !== array2[j]) {
          array3.push(array1[i]);
        }
      }
    }
    return array3;
  };
  // DeleteIdenticalElements(array1, array2, array3) // use in Project
  ////////////////////////////////////////////////////////////////////
  LIKE.findOne({ project: project })
    .then((like) => {
      if (!like) {
        newLike
          .save()
          .then((newLike) => res.status(200).json(newLike))
          .catch((error) => res.status(400).json({ error }));
      } else if (like) {
        //-------------------------------------------------
        const identicIPs = [];
        FindIdenticalElements(like.ipList, allMyIPs, identicIPs);
        console.log("identicIPs:", identicIPs);
        console.log("identicIPs-length:", identicIPs.length);
        const includesIp = like.ipList.includes(ip);
        console.log("includesIp:", includesIp);
        let newLikes;
        let newIpList;
        let newIpList2;
        let filteredIpList;
        //-----------------------------
        if (ip && identicIPs.length === 0 && !includesIp) {
          newIpList = like.ipList;
          newIpList.push(ip);
          console.log("incr-newIpList:", newIpList);
          newLikes = newIpList.length;
        } else if (ip && identicIPs.length <= 0 && includesIp) {
          function filteredIp(el) {
            return el !== ip;
          }
          filteredIpList = like.ipList.filter(filteredIp);
          newLikes = filteredIpList.length;
          newIpList = filteredIpList;
        } else if (ip && identicIPs.length > 0) {
          newIpList2 = [];
          console.log("like.ipList:", like.ipList);
          console.log("64-newIpList2:", newIpList2);
          DeleteIdenticalElements(like.ipList, identicIPs, newIpList2);
          console.log("66-newIpList2:", newIpList2);
          newIpList = newIpList2;
          console.log("68-newIpList", newIpList);
          newLikes = newIpList.length;
          console.log("71-newIpList2", newIpList2);
        }
        
        //------------------------------------------------------
        LIKE.updateOne(
          { project: project },
          {
            _id: LIKE._id,
            project: LIKE.project,
            ipList: newIpList,
            likes: newLikes,
            createdAt: LIKE.createdAt,
            updatedAt: LIKE.updatedAt,
            __v: LIKE.__v,
          }
        )
          .then((updatedLike) => {
            res.status(200).json(updatedLike);
          })
          .catch((error) => res.status(400).json({ error }));
      } //else return;
    })
    .catch((error) => res.status(400).json({ error }));

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // like
  // .save()
  // .then((like) => res.status(200).json(like))
  // .catch((error) => handleError(res, error));
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
};
exports.getLike = (req, res, next) => {
  LIKE.find()
    .sort({ createdAt: -1 })
    // .sort({ clientInfo: req.clientInfo })

    .then((likes) => res.status(200).json(likes))
    .catch((error) => res.status(400).json({ error }));
};
