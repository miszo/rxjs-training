// webservice client boilerplate

function listenOn(currency){
    var socket = io.connect('/');
    socket.emit('request', { currencies: [currency] });
    socket.on('init', (rates) => {
        console.info('Initial data:', rates);
    });
    socket.on('update', (data) => {
        console.info('Update:', data);
    });
    socket.on('disconnect', () => {
        console.log('disconnected');
        socket.close();
    });
    return () => socket.disconnect();
}

let usd = listenOn('usd');
// to teardown
// usd()
