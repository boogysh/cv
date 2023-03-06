const LIKE = require("../models/like");

exports.createLike = (req, res) => {
  const { project, ip, allMyIPs } = req.body;
  const newLike = new LIKE({ project, ipList: ip, likes: 1 });
  console.log("6-ip:", ip);
  !allMyIPs.includes(ip) && allMyIPs.push(ip);
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
        console.log("like.ipList:", like.ipList);
        console.log("identicIPs:", identicIPs);
        //----------
        const newIpList2 = [];
        DeleteIdenticalElements(like.ipList, identicIPs, newIpList2);
        console.log("59-newIpList-deleted:", newIpList2);
        //----------
        const includesIp = like.ipList.includes(ip);
        console.log("includesIp:", includesIp);
        let newLikes;
        let newIpList;
        //-----------------------------
        if (ip && identicIPs.length === 0 && !includesIp) {
          newIpList = like.ipList;
          newIpList.push(ip);
          console.log("incr-newIpList:", newIpList);
          newLikes = newIpList.length;
        } else if (ip && identicIPs.length > 0) {
          //-----------
          newIpList = newIpList2;
          console.log("73-newIpList-deleted:", newIpList2);
          newLikes = newIpList.length;
        } else return;

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
