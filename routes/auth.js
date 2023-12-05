var express = require("express"),
  router = express.Router(),
  verifyToken = require('../middlewares/authJWT'),
  {
    register,
    login
  } = require("../controllers/auth.js");


router.post("/register", register, function (req, res) {

});

router.post("/login", login, function (req, res) {

});

router.get("/verifytoken", verifyToken, function (req, res) {

    res.status(403)
            .send({
            message: "Invalid JWT token"
            });
    // if (user === undefined) {
    //     res.status(403)
    //         .send({
    //         message: "Invalid JWT token"
    //         });
    // }
    // if (user) {
    //     res.status(200)
    //         .send({
    //         message: "Congratulations, token verify successfully",
    //         result: user
    //         });
    // }
})
module.exports = router;