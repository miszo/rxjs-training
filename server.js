const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const argv = require('yargs')
.alias('v', 'verbose')
.option('port', {
  default: 8080,
  alias: 'p'
}).argv;

const logIfVerbose = (...params) => {
  if (argv.verbose) {
    console.log(...params)
  }
}

const currencySvc = require('./server-currency');

const sendPath = (path) =>
  (req, res) => res.sendFile(__dirname + path)

app.get('/', sendPath('/src/index.html'))
app.get('/dist/bundle.js', sendPath('/dist/bundle.js'))
app.get('/src/assets/bootstrap.css', sendPath('/src/assets/bootstrap.css'))
app.get('/src/assets/app.css', sendPath('/src/assets/app.css'))
app.get('/src/assets/connectivity.png', sendPath('/src/assets/connectivity.png'))

server.listen(argv.port);
console.log(`listening on port ${argv.port}`);

currencySvc.start();
console.log(`starting currency service`);

const randomId = () => Math.random().toString(36).substring(2)

const clients = []; // as well might be kept as a map
const logClients = () => console.log(`Total number of clients: ${clients.length}`);
const removeClient = (id) => {
  let idx = clients.findIndex(c => c.id === id);
  clients.splice(idx, 1);
}
currencySvc.register((currency, delta) => {
  logIfVerbose(currency, delta);
  clients.forEach((client) => {
    if (client.request && client.request.currencies.indexOf(currency) > -1) {
      client.socket.emit('update', { currency, delta });
    }
  })
});

io.on('connection', function(socket) {
  let id = randomId();
  const client = { id, socket };
  clients.push(client);
  console.log(`Client id:${id} connected`);
  logClients();

  socket.on('request', function(request) {
    // enforce uppercase
    request.currencies = request.currencies.map(c => c.toUpperCase());
    client.request = request;
    console.log(`Client id:${id} requests updates on:`, request.currencies);
    socket.emit('init', currencySvc.getRates(request.currencies))
  });
  socket.on('disconnect', function () {
    console.log(`Client id:${id} disconnected`);
    removeClient(id);
    logClients();
  });
});
