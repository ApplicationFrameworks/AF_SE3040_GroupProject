require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles:true
}))

//Routes
app.use('/api', require('./routes/categoryRouter'))

//connect to mongo db
const URI = process.env.MONGODB_URL
mongoose.connect(URI,{
    //useCreateIndex: true,
    //useFindAndModify: false,
    //useNewUrlParser: true,
    //useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB')
})

const User = require('./models/User');

const userInput = {
    username:"DimaPerera",
    password:"12341234",
    role:"admin"
}

const user = new User(userInput);
user.save((err,document)=>{
    if(err)
    console.log(err);
    console.log(document);
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log('Server is running on port',PORT)
})
