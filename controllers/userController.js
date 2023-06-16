const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");



exports.register = async (req, res) => {
    try {
        console.log(req.body)

        if (!req.body || !req.body.username || !req.body.password || !req.body.type)
            return res.status(400).json({ success: false, msg: "Username, password and type are mandatory" });
        // NEW
        
        let user = await User.findOne({ username: req.body.username });
        if (user)
            return res.status(409).json({ success: false, msg: "User already exists." });

        // Save user to DB
        user = await User.create({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10),
            type: req.body.type,
        });

        return res.status(201).json({ success: true, msg: "User was registered successfully!" });

    }
    catch (err) {
            res.status(500).json({
                success: false, msg: err.message || "Some error occurred while signing up."
            });
    };
};

  
  exports.login = async (req, res) => {
    try {
        if (!req.body || !req.body.username || !req.body.password)
            return res.status(400).json({ success: false, msg: "Failed! Must provide username and password." });

        let user = await User.findOne({username: req.body.username});
        console.log(user)
        if (!user)
            return res.status(404).json({ success: false, msg: "User not found." });

        const check = bcrypt.compareSync(
            req.body.password, user.password
        );
        // const check = req.body.password == user.password;

        if (!check) {
            return res.status(401).json({
                success: false, accessToken: null, msg: "Invalid credentials!"
            });
        }

        //UNSAFE TO STORE EVERYTHING OF USER, including PSSWD
        // sign the given payload (user ID) into a JWT payload – builds JWT token, using secret key
        const token = jwt.sign({ id: user._id.toString(), type: user.type },
            "KEY", { 
            expiresIn: '24h' // 24 hours
            // expiresIn: '20m' // 20 minutes
            // expiresIn: '1s' // 1 second
        });

        console.log({ id: user._id.toString(), type: user.type })
        return res.status(200).json({
            success: true,
            accessToken: token,
            type: user.type
        });

    } catch (err) {
            res.status(500).json({
                success: false, msg: err.message || "Some error occurred at login."
            });
    };
};


  
  
  exports.verifyToken = (req, res, next) => {
      const header = req.headers.authorization;
      console.log(header)
  
      if (typeof header == 'undefined') {
          return res.status(401).json({
              success: false, msg: "No token provided!"
          });
      }
  
      let token, bearer = header.split(' ');
      if (bearer.length == 2)
          token = bearer[1];
      else
          token = header;
      
      try {
          let decoded = jwt.verify(token, "KEY");
          req.loggedUserId = decoded.id;
          req.loggedUserType = decoded.type;
          next();
  
      } catch (err) {
          if (err.name === 'TokenExpiredError')
              return res.status(401).json({ success: false, msg: "Whoops, your token has expired! Please login again." });
  
          if (err.name === 'JsonWebTokenError')
              return res.status(401).json({ success: false, msg: "Malformed JWT" });
  
          return res.status(401).json({ success: false, msg: "Unauthorized!" });
      }
  };