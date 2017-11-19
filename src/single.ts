import { Observable } from 'rxjs';

export const coldStreamSingle = (currency) => {
    return Observable.create(observer => {
        var socket = io.connect('/');
        socket.emit('request', { currencies: [currency] });
        socket.on('init', function(rates) {
            observer.next(rates);
        });
        socket.on('update', function(data) {
            observer.next(data);
        });
        return () => socket.disconnect();
    })
    .map(item => !item.currency ? item[currency] : item)
    .scan((aggr, update) => aggr + update.delta)
}
