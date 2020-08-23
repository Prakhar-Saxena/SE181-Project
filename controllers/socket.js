var { v4: uuidv4 } = require('uuid');
var io = require('socket.io')(80);

var roomId = uuidv4();
var users = [];

exports = module.exports = function(io) {
    io.on('connection', function(socket) {
        io.emit("Welcome to our chess game");
    
        socket.on('sendName',sendName)
    
        socket.on("sendMessage", sendMessage);
    
        socket.on("joinRequestTo",joinRequestTo)
          
        socket.on('joinRequestAnswer',joinRequestAnswer)
    
        socket.on('newGameRequest',newGameRequest);
    
        socket.on("joinRoom", joinRoom);
    
        socket.on("disconnect", disconnect);
    
        socket.on("newGame", newGame);
    
        socket.on("movePiece", movePiece);
    
        function sendMessage(room, message) {
            console.log("in function")
            socket.broadcast.to(room).emit("sendMessage", message);
        }
    
        function joinRoom(room) {
            socket.broadcast.to(room).emit("sendMessage", "SERVER: a user just joined");
            socket.join(room);
            users.filter(user=>user.id == socket.id)[0].room = room;
        }
    
        function disconnect() {
            for(user in users) {
                if(user.id = socket.id) {
                    socket.broadcast.to(user.room).emit("opponentDisconnect");
                    users.splice(users.indexOf(user), 1);
                    break;
                }
            }
        }
    
        function joinRequestAnswer(answer,socketId){
            var user = users.filter(user=>user.id == socket.id)[0];
        
            if(answer=="yes"){
              socket.to(socketId).emit("joinRoom",user.room, user.name);
            }
          }
    
        function newGameRequest(room){
            if(room)
              socket.broadcast.to(room).emit("newGameRequest");
          }
        
          function joinRequestTo(name){
            console.log('sendRequest to ' + name);
            for(var i=0;i<users.length;i++){
              if(users[i].name===name){
                socket.broadcast.to(users[i].room).emit("joinRequestFrom",socket.id);
                break;
              }
            }
          }
    
        function sendName(name){
            var isNameValid = true;
            for(var i=0;i<users.length;i++){
                if(users[i].name===name){
                    isNameValid = false;
                    socket.emit('nameError','Name is already existed, Try again');
                    return;
                }
            }
            if(isNameValid){
              var room = generateRoomId();
              users.push({id:socket.id, name:name, room:room});
              socket.join(room);
              socket.emit("roomId",room);
            } 
        }
    
        function newGame(room) {
            io.to(room).emit("newGame");
        }
    
        function movePiece(room, clientData) {
            socket.broadcast.to(room).emit("movePiece", clientData);
        }
    })    
}
