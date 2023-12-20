console.clear()
const express = require("express");
const app = express();
const cors = require('cors');

const PORT = 3000

const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
  cors : {
    origin : "*"
  }
});

io.on("connection", (socket) => {

  // ...
 
  socket.on('status', (finished)=> {
    console.log(finished)
  })
});

app.use(cors())

httpServer.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}` );
})

