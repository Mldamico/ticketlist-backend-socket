const TicketList = require("./ticketList");
class Sockets {
  constructor(io) {
    this.io = io;
    this.ticketList = new TicketList();
    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", socket => {
      socket.on("solicitar-ticket", (data, callback) => {
        const nuevoTicket = this.ticketList.crearTicket();
        callback(nuevoTicket);
      });
    });
  }
}

module.exports = Sockets;
