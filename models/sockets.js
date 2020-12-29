const TicketList = require('./ticketList');
class Sockets {
  constructor(io) {
    this.io = io;
    this.ticketList = new TicketList();
    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on('connection', (socket) => {
      socket.on('solicitar-ticket', (data, callback) => {
        const nuevoTicket = this.ticketList.crearTicket();
        callback(nuevoTicket);
      });
      socket.on('siguiente-ticket-trabajar', (usuario, callback) => {
        const suTicket = this.ticketList.asignarTicket(
          usuario.agente,
          usuario.escritorio
        );
        callback(suTicket);
        this.io.emit('ticket-asignado', this.ticketList.ultimos13);
      });
    });
  }
}

module.exports = Sockets;
