const express = require('express') 
const mongoose = require('mongoose');
const bodyParser = require("body-parser");


const app = express();


const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

let dbUrl = "mongodb://localhost:27017/tcsmean";

// connect to the databse
mongoose.connect(dbUrl)
    .then(res => {
        console.log("Connected to the database") ;
    })
    .catch(e => {
        console.log(e);
    });


mongoose.pluralize(null);

const chatLogSchema = mongoose.Schema({
        name:String,
        message:String,
})


const chatLogModel = mongoose.model("ChatLog", chatLogSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})





io.on('connection', (socket) =>{
    console.log(`Connection established with the client`);

        socket.on('message', (msgObj) => {
            console.log(msgObj);
            chatLogModel.insertMany([msgObj], (e, result) => {
                if(e){
                    socket.emit("Error occured");
                }else{
                    socket.emit('message', result);
                }
            })
        })

        // disconnet 
        socket.on('disconnect', () => {
            console.log('clinet disconnected');
        });
});


server.listen(9090, () => console.log("Server is listening on port 9090"));