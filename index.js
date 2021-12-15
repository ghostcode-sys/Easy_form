const express = require("express");
const converter = require("json-2-csv");
const fs = require("fs");
const path = require("path");
const FormQues = require("./Models/formQuestion");
const FormAns = require("./Models/formAnswers");
require("dotenv").config();
const { AuthRouter, FormRouter, FormRender, HomeRouter } = require("./Routes");
const app = express();
require("./Middleware/DB");

app.use(express.json());
app.set("view engine", "pug");
app.set("views", "./views");
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/api/auth", AuthRouter);
app.use("/api/form", FormRouter);
app.use("/api/home", HomeRouter);
app.use("/easy", FormRender);

if(process.env.NODE_ENV = "production"){
  app.use(express.static("frontend/build"))
  const path = require("path");

    app.get("*", (req, res) => {

        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));

    }
}

const getData = async (id) => {
  const question = await FormQues.findById(id);
  const answer = await FormAns.findById(question.answerSheet);
  let arr = answer.answers.map((ele) => {
    let obj = {};
    for (let i = 0; i < question.question.length; i++) {
      let id = question.question[i]._id;
      if (Array.isArray(ele.answer[0][id])) {
        obj = {
          ...obj,
          [question.question[i].questionData]: ele.answer[0][id].join(", "),
        };
      } else
        obj = {
          ...obj,
          [question.question[i].questionData]: ele.answer[0][id],
        };
    }
    return obj;
  });
  // console.log(arr)
  return arr;
};

// getData("61b5e507e3d82855128a3020")

app.get("/responseSheet/:id/response", async (req, res) => {
  try {
    const todos = await getData(req.params.id);
    const csv = await converter.json2csvAsync(todos);

    var options = {
      root: path.join(__dirname),
    };
    // print CSV string
    // console.log(csv);

    // write CSV to a file

    fs.writeFileSync("todos.csv", csv);
    const fileName = "todos.csv";
    res.sendFile(fileName, options, function (err) {
      if (err) {
        console.log(error);
      } else {
        console.log("Sent:", fileName);
      }
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`connected to port ${PORT} \n`);
  console.log(`http://localhost:${PORT}/`);
});
