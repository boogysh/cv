const LIKE = require("../models/like");

exports.createLike = (req, res) => {
  const { project, ip } = req.body;
  // const newLike = new LIKE({ project, ipList: ip, likes: 1 });
  const newLike = new LIKE({ project, ipList: ip, likes: 1 });
  // console.log("likes", likes);

  LIKE.findOne({ project: project })
    .then((like) => {
      // console.log("likes", like.likes);
      if (!like) {
        //console.log("like", like); //expected null

        newLike
          .save()
          .then((newLike) => res.status(200).json(newLike))
          .catch((error) => res.status(400).json({ error }));
      } else if (like) {
        //-------------------
        //const result = like.ipList.filter((like) => like !== ip);
        //-------------------
        const includesIp = like.ipList.includes(ip);
        const newIpList = like.ipList;
        let newLikes = 0;
        if (includesIp) {
          newLikes = like.ipList.length - 1;
          // newIpList.pop(ip) && newLikes;
          newIpList.filter((like) => like[i] !== ip);
        } else {
          newLikes = like.ipList.length + 1;
          newIpList.push(ip) && newLikes;
        }
        //-------------------
        // const newIpList = like.ipList;
        // newIpList.push(ip);
        // const newLikes = like.ipList.length;
        // console.log("newIpList", newIpList);
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
            console.log("updatedLike", updatedLike);
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
