const mongoose = require("mongoose")

const answerSchema = mongoose.Schema({
    quesId:{
        type: String,
        required:true
    },
    answers:[
        {
            answer : []
        }
    ]
})

const FormAns = mongoose.model("FormAnswer", answerSchema)
module.exports = FormAns