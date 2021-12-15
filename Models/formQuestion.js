const mongoose = require("mongoose");
const FormAns = require("./formAnswers")

const formQuesSchema = new mongoose.Schema({
  answerSheet:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "FromAnswer"
  },
  formType: {
    type: String,
    enum: ["quiz", "blank"],
  },
  title: {
    type: String,
    required: true,
  },
  information: {
    type: String,
    required: true,
  },
  takingResponse:{
    type:Boolean,
    default:true
  },
  question: [
    {
      quesType: {
        type: String,
        enum: ["simple", "multiline", "radio", "checkbox"],
        required: true,
      },
      questionData: {
        type: String,
        required: true,
      },
      quesOptions: [
      ],
      correctAnswer: [],
      quesReq:{
        type:Boolean,
        default:true
      }
    },
  ]
});

const FormQues = mongoose.model("formQuestion", formQuesSchema);

module.exports = FormQues;
