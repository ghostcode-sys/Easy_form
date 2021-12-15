const express = require("express");
const tokenValidate = require("../Middleware/TokenValidate");
const FormQues = require("../Models/formQuestion");
const router = express.Router();

router.get("/", tokenValidate, async (req, res) => {
  try {
    let user = req.user;
    let formData = [];
    for (let i = 0; i < user.forms.length; i++) {
      // console.log(user.forms[i])
      let data = await FormQues.findById(user.forms[i]._id);
      if (data)
        formData.push({
          title: data.title,
          info: data.information,
          id: data._id,
        });
    }
    res.status(200).json({formData });
  } catch (err) {
    res.status(400).send("Error in fetching data")
  }
});

module.exports = router;
