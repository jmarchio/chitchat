'use strict';
/*
var socket = require('socket.io');
var io;
*/
var io;


function chatHandler(socket){
    console.log("handler");
    io.on('connection', function(socket) {
        socket.emit('news', { hello: 'world' });
        console.log("lala");
    });
}

exports.init = function init(listener, callback){

    io = require('socket.io')(listener);
    io.on('connection', chatHandler);

    return setTimeout(function () {
        return callback();
    }, 300); // wait for socket to boot
}