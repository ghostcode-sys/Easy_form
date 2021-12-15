const express = require("express");
const User = require("../Models/User");
const FormQues = require("../Models/formQuestion");
const FormAns = require("../Models/formAnswers");
const router = express.Router();

const tokenValidate = require("../Middleware/TokenValidate");

router.post("/formques", tokenValidate, async (req, res) => {
  // console.log("i am called")
  const { formData } = req.body;
  console.log(req.formData);
  try {
    const formVal = new FormQues({ ...formData });
    await formVal.save();

    const user = req.user;
    console.log(Object.values(user.forms), " ==> user object");
    user.forms.unshift(formVal._id);
    await user.save();
    res.status(200).json({ link: `http://localhost:8000/easy/${formVal._id}` });
  } catch (error) {
    console.log(error);
    res.status(400).send("somthing went wrong ");
  }
});

router.put("/responseEdit", async (req, res) => {
  try {
    const { id, action } = req.body;
    if (action === "delete") {
      const ques = await FormQues.findByIdAndDelete(id);
      const answer = await FormAns.findByIdAndDelete(ques.answerSheet);
    } else {
      const ques = await FormQues.findById(id);
      if (ques) {
        ques.takingResponse = action;
      }
      await ques.save();
    }
    res.status(200).send("Successful");
  } catch (error) {
    console.log(err);
  }
});

router.get("/answer/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let question = await FormQues.findById(id);
    let answer = await FormAns.findById(question.answerSheet);
    res.status(200).json({ question, answer,link:process.env.LINK });
  } catch (error) {
    res.status(400).send("Error occured while fetching data ");
  }
});

// router.get("/checkdata", async(req,res) => {
//     const form = await FormQues.findById("61b0ce2b212053cc6e1c5af8")
//     res.status(200).json(form)
// })

module.exports = router;
