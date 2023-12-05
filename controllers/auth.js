var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var User = require("../models/user");
const refreshTokens = []

exports.register = (req, res) => {
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.first_name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save().then((user)=>{
        res.status(200)
        .send({
          data:user,
          message: "User Registered successfully"
        })
    }).catch((err) =>{
        res.status(500).send({ message: err});
        return; 
    })

}

login = async (req, res) => {
// exports.login = (req, res) => {
    await User.findOne({
        email: req.body.email
    }).then((user) => {
        console.log(user)
        if(!user){
            return res.status(404)
            .send({
              message: "User Not found."
            });
        }

        //comparing passwords
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        // checking if password was valid and send response accordingly
        if (!passwordIsValid) {
            return res.status(401)
            .send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }
        
        const credentials = {
            email: req.body.email,
            id:user.id
        }
        const token  =  jwt.sign({credentials}, process.env.API_SECRET, { expiresIn: "24h" })
        const refreshToken = jwt.sign(credentials, process.env.REFRESH_TOKEN_SECRET);
        refreshTokens.push(refreshToken);

        //responding to client request with user profile success message and  access token .
      res.status(200)
      .send({
        user: {
          id: user._id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
        },
        message: "Login successfull",
        accessToken: token,
        refreshToken: refreshToken
      });

    }).catch((err) => {
        if(err){
            console.log(err)
            res.status(500).send({ message: err});
            return;
        }
    })
}