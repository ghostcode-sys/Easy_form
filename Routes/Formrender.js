const express = require("express");
const FormQues = require("../Models/formQuestion");
const FormAns = require("../Models/formAnswers");
const { rawListeners } = require("../Models/formAnswers");
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const formdata = await FormQues.findById(id);
    if (formdata) {
      if (formdata.takingResponse === false) {
        res.render("status", {
          status: "This form is not taking responses anymore",
          link: process.env.LINK2,
        });
      } else {
        let info = formdata.information;
        let title = formdata.title;
        let question = formdata.question;
        let formID = formdata._id;
        res.render("test", {
          info,
          title,
          question,
          formID,
          link: process.env.LINK,
        });
      }
    } else {
      res.render("status", {
        status: "No Such Form Exists",
        link: process.env.LINK2,
      });
    }
  } catch (error) {
    res.render("status", {
      status: "Error occured While Loading Form",
      link: process.env.LINK2,
    });
    // res.status(400).send("Error occured");
  }
});

router.post("/:id", async (req, res) => {
  try {
    const data = req.body;
    // console.log(data, req.params.id)
    var ansId;
    const form = await FormAns.findOne({ quesId: req.params.id });
    if (form) {
      form.answers.push({
        answer: {
          ...req.body,
        },
      });
      form.save();
    } else {
      const form = new FormAns({
        quesId: req.params.id,
        answers: [
          {
            answer: {
              ...req.body,
            },
          },
        ],
      });
      await form.save();
      ansId = form._id;
    }
    if (ansId !== undefined) {
      const ques = await FormQues.findById(req.params.id);
      ques.answerSheet = ansId;
      ques.save();
    }
    res.render("status", {
      status: "Form Submitted SuccessFully",
      link: process.env.LINK2,
    });
  } catch (error) {
    // res.status(400).send("Error occured");
    // console.log(error)
    res.render("status", {
      status: "Error occured While Submiting Form",
      link: process.env.LINK2,
    });
  }
});

module.exports = router;
