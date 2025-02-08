const socket = require("socket.io")


const initializeSocket = (server) => {

  const io = socket(server, {
    cors: {
      origin: "http://localhost:5174",
    },
  });


const roomCounts = {};  

const socketToRoom = {};  



io.on('connection', (socket) => {
  console.log('A user connected');
  
  
  socket.on('readEvent', ({Id}) => {
    console.log('User reading the event: '+Id);


    socket.join(Id);
  });


  socket.on('attendance', ({Id})=>{
     const count = 1;

     if (!roomCounts[Id]) {
      roomCounts[Id] = 0;
    }

    roomCounts[Id]++;  
    socketToRoom[socket.id] = Id
     console.log(Id+" Joined the room");
    io.to(Id).emit("receiveAttendance",{count: roomCounts[Id]});
  });

  socket.on('disconnect', () => {
    console.log('User diconnected');
    const Id = socketToRoom[socket.id]; 
    if (Id && roomCounts[Id] > 0) {
      roomCounts[Id]--; 
      io.to(Id).emit("receiveAttendance", { count: roomCounts[Id] });

      delete socketToRoom[socket.id]; 
    }

  });
});



}



module.exports = initializeSocket; 