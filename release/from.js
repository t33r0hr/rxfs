"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
exports.fromReadable = function (readable) {
    return rxjs_1.Observable.create(function (observer) {
        function nop() { }
        ;
        var nextFn = observer.next ? observer.next.bind(observer) : nop;
        var returnFn = observer.complete ? observer.complete.bind(observer) : nop;
        var throwFn = observer.error ? observer.error.bind(observer) : nop;
        const onData = (data) => {
            rxjs_1.Observable.from(data.split('\n')).subscribe(nextFn, throwFn);
        };
        readable.on('data', (data) => {
            if ('string' === typeof data) {
                onData(data);
            }
            else {
                onData(data.toString('utf8'));
            }
            //const rows = data.toString().split('\n')
            /*          console.log('data length %s', data.length)
                      console.log('---')
                      console.log('%s',data)
                      console.log('---')
            */ 
        });
        readable.on('close', returnFn);
        readable.on('end', returnFn);
        readable.on('error', throwFn);
        return new rxjs_1.Subscription(function () {
            readable.removeListener('data', nextFn);
            readable.removeListener('end', returnFn);
            readable.removeListener('close', returnFn);
            readable.removeListener('error', throwFn);
        });
    }, rxjs_1.Scheduler.asap);
};
//# sourceMappingURL=from.js.map