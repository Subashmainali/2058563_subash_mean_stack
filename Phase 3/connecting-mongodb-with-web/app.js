const express = require('express');
const cors = require('cors')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();



const courseRouter = require("./router/course.router");


app.use(cors());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 



let dbUrl = "mongodb://localhost:27017/tcsmean";

// connect to the databse
mongoose.connect(dbUrl)
    .then(res => {
        console.log("Connected ") ;
    })
    .catch(e => {
        console.log(e);
    });




app.get("", (req, res) => {
    res.sendFile(__dirname + "/view/index.html")
})

app.get("/home", (req, res) => {
    res.sendFile(__dirname + "/view/index.html")
})

app.get("/addCourse", (req, res) => {
    res.sendFile(__dirname + "/view/addCourse.html")
})
app.get("/updateCourse", (req, res) => {
    res.sendFile(__dirname + "/view/updateCourse.html")
})

app.get("/deleteCourse", (req, res) => {
    res.sendFile(__dirname + "/view/deleteCourse.html")
})

app.get("/fetchCourse", (req, res) => {
    res.sendFile(__dirname + "/view/fetchCourses.html")
})




// http://localhost:9090/api/addCourse
// http://localhost:9090/api/updateCourse
// http://localhost:9090/api/deleteCourse
// http://localhost:9090/api/fetchCourses
app.use("/api", courseRouter);



app.listen(9090, () => { console.log("Server is listening on 9090")});




