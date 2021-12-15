const mongoose = require("mongoose");
const  url =  process.env.DBURL;
mongoose.connect(url,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.once('open', _ => {
    console.log('Database connected:', url)
  })

  
db.on('error', err => {
    console.error('connection error:', err)
  })