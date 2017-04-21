import { Observable, Observer, Subscription, Scheduler } from 'rxjs'
import { Readable } from 'stream'


export const fromReadable = function(readable:Readable) {
    return Observable.create(function(observer:Observer<Buffer>) {
        function nop() {};

        var nextFn = observer.next ? observer.next.bind(observer) : nop;
        var returnFn = observer.complete ? observer.complete.bind(observer) : nop;
        var throwFn = observer.error ? observer.error.bind(observer) : nop;

        const onData = ( data:string ) => {
          Observable.from(data.split('\n')).subscribe(
              nextFn,
              throwFn
            )
        }

        
        readable.on('data', (data)=>{
          if ( 'string' === typeof data )
          {
            onData(data)
          }
          else 
          {
            onData(data.toString('utf8'))
          }
          //const rows = data.toString().split('\n')
/*          console.log('data length %s', data.length)
          console.log('---')
          console.log('%s',data)
          console.log('---')
*/        })
        readable.on('close',returnFn)
        readable.on('end', returnFn);
        readable.on('error', throwFn);

        return new Subscription(function() {
            readable.removeListener('data', nextFn);
            readable.removeListener('end', returnFn);
            readable.removeListener('close', returnFn);
            readable.removeListener('error', throwFn);
        });
    }, Scheduler.asap)
}