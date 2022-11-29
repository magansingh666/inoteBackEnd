const express = require("express");
const router = express.Router();
const User = require("../models/User");

const { body, validationResult } = require("express-validator");
const { request } = require("express");

var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const JWT_SECRET = "Harryisagoodb$oy";

const fetchuser = require("../middleware/fetchuser.js");

//creates user by sending POST request.  No authentication required.
router.post(
  "/createuser",
  // username must be an email
  body("email", "enter a valid email").isEmail(),
  // name and password must be at least 5 chars long
  body("name", "enter a valid name").isLength({ min: 5 }),
  body("password", "enter a valid password").isLength({ min: 5 }),

  async (req, res) => {
    // If there are validation errors inform user
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "user already exit" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      // res.json(user)
      res.json({ authtoken });
    } catch (errors) {
      console.error(errors.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//creates user by sending POST request.  No authentication required.
router.post(
  "/login",
  // username must be an email
  body("email", "enter a valid email").isEmail(),
  body("password", "enter a valid password").exists(),

  async (req, res) => {
    // If there are validation errors inform user
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);

    const {email, password} = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        }
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
    } catch (errors) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//getuser by sending post request
router.post(
  "/getuser",fetchuser, 

  async (req, res) => {
    try {
      let userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
   
    
  }
);
module.exports = router;
