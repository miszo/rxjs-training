import { Observable } from 'rxjs';

export const coldStreamMulti = (currencies) => {
    return Observable.create(observer => {
        var socket = io.connect('/');
        socket.emit('request', { currencies });
        socket.on('init', function(rates) {
            observer.next(rates);
        });
        socket.on('update', function(data) {
            observer.next(data);
        });
        return () => socket.disconnect();
    })
    .scan((aggr, update) => {
        aggr[update.currency] += update.delta;
        return aggr;
    });
    // .map(rate => ({ rate, time: new Date() }));
}
