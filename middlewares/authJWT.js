const jwt = require("jsonwebtoken");
User = require("../models/user");


const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    //Extracting token prefix from authorization header
    const token_prefix = authHeader && authHeader.split(" ")[0];
    if(process.env.PARSE_TOKEN != token_prefix){
        return res.status(401)
        .send({
            accessToken: null,
            message: "Authorization failed. No access token.!"
        });
    }
    //Extracting token from authorization header
    const token = authHeader && authHeader.split(" ")[1];
  
    //Checking if the token is null
    if (!token) {
      return res.status(401).send("Authorization failed. No access token s.");
    }
  
    //Verifying if the token is valid.
    jwt.verify(token, process.env.API_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({message: "Could not verify token"});
      }
      req.user = user;
      console.log(user)
      next();
    });
   
  };

  module.exports = verifyToken;