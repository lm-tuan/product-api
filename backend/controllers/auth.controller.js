const jwt = require("jsonwebtoken");
const User = require("./../models/user.model");

module.exports.register = async (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (user) {
      return res.json({ error:'User ready in use !' });
    } else {
      if (req.body.password !== req.body.passwordConf) {
        var err = new Error({error:"Passwords do not match."});
        err.status = 400;
        res.json({error:"passwords dont match"});
        return next(err);
      }

      if (req.body.username && req.body.password && req.body.passwordConf) {
        var userData = {
          username: req.body.username,
          password: req.body.password
        };

        User.create(userData, function(error, user) {
          if (error) {
            return next(error);
          } else {
            req.session.userId = user._id;
            return res.json({message:"account sucesss !"});
          }
        });
      } else if (req.body.logemail && req.body.logpassword) {
        User.authenticate(req.body.logemail, req.body.logpassword, function(
          error,
          user
        ) {
          if (error || !user) {
            var err = new Error("Wrong username or password.");
            err.status = 401;
            return next(err);
          } else {
            req.session.userId = user._id;
            return res.redirect("/profile");
          }
        });
      } else {
        var err = new Error("All fields required.");
        err.status = 400;
        return next(err);
      }
    }
  });
};

module.exports.authenticate =  (req, res, next) => {
  const { username, password } = req.body;
  
  User.findOne({ username }, (err, user) => {
    console.log('user',user);
    
    if (user) {
      var comparePassword = bcrypt.compareSync(password, user.password);
      console.log(comparePassword) ;
      if(comparePassword){
        const payload = {
            check: true,
            sub: user.username
          };
          var token = jwt.sign(payload, process.env.JWT_SCREET, {
            expiresIn: 1440
          });
    
          res.cookie("access_token", token);
          return res.json({ message: "authentication done ", access_token: token });
      }else{
        return res.json({ error: " password wrong" });
      }
      
    } else  {
      return res.json({ error: "error: account not exssit" });
    }
  });
};
