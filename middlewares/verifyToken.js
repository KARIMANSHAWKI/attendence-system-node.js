const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  let token ='';
  if(authHeader){
     token = authHeader.split(" ")[1];
  }else{
    res.status(403).send("You are not authenticated!");
  }
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) res.status(403).send("Token is invalid!");
      req.user = user;
      next();
    });
  } else {
    res.status(401).send("You are not authenticated!");
  }
};
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if ((req.user.id == req.params.id && user.isVerified) || req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("you are not allowed!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user.isAdmin);
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("you are not allowed!");
    }
  });
};

const verifyTokenAndSubAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isSubadmin || req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("you are not allowed!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndSubAdmin,
};
