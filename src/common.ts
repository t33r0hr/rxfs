import { Observable } from 'rxjs'
export interface CallbackFunction<T> {
  ( error:Error, result?:T ):void
}

export interface TargetFunction<T,U,V> {
  ( callback:CallbackFunction<T> ):any
  ( arg0:U, callback:CallbackFunction<T> ):any
  ( arg0:U, arg1:V, callback:CallbackFunction<T> ):any
}

export interface ObservalizedFunction<T> {
  ( ):Observable<T>
}

declare function callObservalized<T0>(func:Function):Observable<T0>
declare function callObservalized<T0, T1>(func:Function,arg1:T1):Observable<T0>
declare function callObservalized<T0, T1, T2>(func:Function,arg1:T1,arg2:T2):Observable<T0>

/*declare function observalize<T0>(func:Function):ObservalizedFunction<T0>
declare function observalize<T0, T1>(func:Function,arg1:T1):ObservalizedFunction<T0>
declare function observalize<T0, T1, T2>(func:Function,arg1:T1,arg2:T2):ObservalizedFunction<T0>
*/

export interface Callable<T> {
  ():Promise<T>
  (arg1):Promise<T>
  (arg1,arg2):Promise<T>
}

declare function promisify<T0>(func:Function):Callable<T0>
declare function promisify<T0,T1>(func:Function,arg1:T1):Callable<T0>
declare function promisify<T0,T1,T2>(func:Function,arg1:T1,arg2:T2):Callable<T0>

export const _promisify = <T0,T1,T2>( func:Function ):Callable<T0> => {
  return (arg1?:T1,arg2?:T2):Promise<T0> => new Promise((resolve,reject)=>{
    if ( arg2 )
    {
      func(arg1,arg2,(error,result)=>{
        error ? reject(error) : resolve(result)
      })
    }
    else if ( arg1 )
    {
      func(arg1,(error,result)=>{
        error ? reject(error) : resolve(result)
      })
    }
    else
    {
      func((error,result)=>{
        error ? reject(error) : resolve(result)
      })
    }
  })
}

export const _observalize  = ( target:Function ) => {  
  return _promisify(target)  
}