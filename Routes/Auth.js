// module import
const express = require("express");
const jwt = require("jsonwebtoken");
const generator = require("generate-password");

// other files import
const User = require("../Models/User");
const { Router } = require("express");
const validadateData = require("../Middleware/Check");

// code starts here
const router = express.Router();

// Json secret key import form .env file
const jwtKey = process.env.SECRETKEY;

// links
router.post("/register", validadateData, async (req, res) => {
  const user = req.user;
  try {
    const person = await User.findOne({ email: user.email });
    if (person) {
      return res.status(422).send("User Already exists");
    } else {
      const person = new User({ ...user });
      await person.save();
      const token = jwt.sign({ UserID: person._id }, jwtKey);
      res.status(200).json({ token, user: person });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const { user } = req.body;
  // console.log(user)
  if (user.email && user.password) {
    try {
      let mail = user.email.toLowerCase();
      const person = await User.findOne({ email: mail });
      // console.log(person)
      if (person) {
        const auth = await person.comparePassword(user.password);
        console.log(auth, "==> auth");
        const token = jwt.sign({ UserID: person._id }, jwtKey);
        res.status(200).json({ token, user: person });
      } else {
        res.status(400).json({ e: "error occureed" });
      }
    } catch (error) {
      // console.log(error, "==> error")
      res.status(401).send("Wrong Information");
    }
  }
});

router.post("/forget", async (req, res) => {
  try {
    const { user } = req.body;
    // console.log(user, "==> forgot");
    let mail = user.email.toLowerCase();
    const person = await User.findOne({ email: mail });
    console.log(person)
    if (person) {
      console.log(person)
      if (
        person.securityQues === user.securityQues &&
        person.securityAns.toLowerCase() === user.securityAns.toLowerCase()
      ) {
        console.log("i am here")
        var password = generator.generate({
          length: 10,
          numbers: true,
        });
        person.password = password;
        await person.save();
        console.log(password)
        res.status(200).json({ password: password });
      } else res.status(400).send("Something went wrong");
    } else res.status(400).send("Something went wrong");
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

module.exports = router;
