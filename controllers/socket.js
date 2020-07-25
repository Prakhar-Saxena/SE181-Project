var uuid = require('uuidv4');
var io = require('socket.io')(80);

var roomId = uuid();
var users = [];

io.on('connection', function(socket) {
    io.emit("Welcome to our chess game");

    socket.on("sendMessage", sendMessageToRoom);

    socket.on("joinRoom", joinRoom);

    socket.on("disconnect", disconnect);

    socket.on("newGame", newGame);

    socket.on("movePiece", movePiece);

    function sendMessageToRoom(room, message) {
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

    function newGame(room) {
        io.to(room).emit("newGame");
    }

    function movePiece(room, clientData) {
        socket.broadcast.to(room).emit("movePiece", clientData);
    }
})
