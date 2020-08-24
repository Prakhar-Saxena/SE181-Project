var { v4: uuidv4 } = require('uuid');
var io = require('socket.io')(80);

var users = [];

exports = module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log("A user has connected");

        io.emit("Welcome to our chess game");
    
        socket.on('sendName',sendName)
    
        socket.on("joinRoom", joinRoom);
    
        socket.on("disconnect", disconnect);
    
        socket.on("newGame", newGame);

    
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
    
        function sendName(name){
            var isNameValid = true;
            for(var i=0;i<users.length;i++){
                if(users[i].name===name){
                    isNameValid = false;
                    console.error('nameError','Name already exists');
                    return;
                }
            }
            if(isNameValid){
              var roomId = uuidv4();
              users.push({id:socket.id, name:name, room:roomId});
              socket.join(roomId);
              socket.emit("roomId",roomId);
              newGame(roomId);
            } 
        }
    
        function newGame(room) {
            io.to(room).emit("newGame");
        }
    })    
}
