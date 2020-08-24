function SocketClient() {
    var socket = io();
    var createGameButton = $('#createGameButton');
    var nameInput = $('#nameInput');
    var gameList = $('#gameList');
    var gameListButtons = $('#gameList button');
    var gameIds = [];
    var room;
    var board;

    createGameButton.click(() => {
        console.log(nameInput.val())
        socket.emit("sendName", nameInput.val())
        gameListButtons.each(() => {
            console.log("id", this.id, nameInput.val());
            if(nameInput.val() == this.id)
                window.alert("cant use name that is already taken");
                return;
        })
        gameList.append($(`<button class="list-group-item list-group-item-action" id="${nameInput.val()}">`).html(nameInput.val()))
        gameIds.push(nameInput.val())
        console.log(gameIds)
    })

    

    socket.on('roomId', (roomId) => {
        room = roomId;
    })

}

socket = SocketClient();