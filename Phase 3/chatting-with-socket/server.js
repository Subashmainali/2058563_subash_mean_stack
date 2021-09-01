const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = 9090;

const { Server } = require("socket.io");
const io = new Server(server);


// root
app.get("/", (req ,res) => {
    res.sendFile(__dirname + "/client.html");
    //res.end();
});

app.get("/test", (req ,res) => {
    res.sendFile(__dirname + "/test.html");
    //res.end();
});


io.on('connection', (socket) =>{
    //let address = socket.handshake.address;
    //console.log(socket);

    // on collection send message to clinet
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    console.log(`Connection established with the client`);
    let msg = `${dateTime}: "Welcome, you are connected to the server`
    socket.emit("startup", msg);

    // recieve message from the client
    socket.on('message', (msgObj) => {
        console.log(msgObj);
        io.emit('message', `${dateTime}: clent: ${msgObj.name}, message: ${msgObj.msg}`);
    });


    // disconnet 
    socket.on('disconnect', () => {
        console.log('clinet disconnected');
    });
})

server.listen( PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`)
})