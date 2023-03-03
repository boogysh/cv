const LIKE = require("../models/like");

exports.createLike = (req, res) => {
  const { project, ip } = req.body;
  const newLike = new LIKE({ project, ipList: ip, likes: 1 });
  // const newLike = new LIKE({ project, ipList: [{ ip: ip }], likes: 1 });
  // console.log("likes", likes);

  LIKE.findOne({ project: project })
    .then((like) => {
      if (!like) {
        newLike
          .save()
          .then((newLike) => res.status(200).json(newLike))
          .catch((error) => res.status(400).json({ error }));
      } else if (like) {
        //-------------------------------------------------
        // const currentIpList = like.ipList;
        const includesIp = like.ipList.includes(ip);
        let newLikes;
        let newIpList;

        let filteredIpList;
        // const filteredIpList = newIpList.filter(filteredIp);
        console.log("filteredIpList:", filteredIpList);
        //-----------------------------
        if (ip && !includesIp) {
          newIpList = like.ipList;
          newIpList.push(ip);
          console.log("incr-newIpList:", newIpList);
          console.log("newIpList.length", newIpList.length);
          newLikes = newIpList.length;
          //-----------------------
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
              // console.log("updatedLike", updatedLike);
            })
            .catch((error) => res.status(400).json({ error }));
          return LIKE;
          //-----------------------
        } else if (ip && includesIp) {
          function filteredIp(el) {
            return el !== ip;
          }
          filteredIpList = like.ipList.filter(filteredIp);
          newLikes = filteredIpList.length;
          console.log("newLikes--else", newLikes);
          newIpList = filteredIpList;
          console.log("newIpList-after filteredIpList", newIpList);
          //---------------------
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
              // console.log("updatedLike", updatedLike);
            })
            .catch((error) => res.status(400).json({ error }));
          return LIKE;
          //---------------------
        }
        //------------------------------------------------------
        //----------------------------
        // const newIpList = like.ipList;
        // // newIpList.push(ip);
        // newIpList.push({ip:ip});
        // const newLikes = like.ipList.length;
        // console.log("newIpList", newIpList);
        //---------------------

        // LIKE.updateOne(
        //   { project: project },
        //   {
        //     _id: LIKE._id,
        //     project: LIKE.project,
        //     ipList: newIpList,
        //     likes: newLikes,
        //     createdAt: LIKE.createdAt,
        //     updatedAt: LIKE.updatedAt,
        //     __v: LIKE.__v,
        //   }
        // )
        //   .then((updatedLike) => {
        //     res.status(200).json(updatedLike);
        //     // console.log("updatedLike", updatedLike);
        //   })
        //   .catch((error) => res.status(400).json({ error }));
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
