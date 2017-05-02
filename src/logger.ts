import { Observable } from 'rxjs'

export const stack = () => {
  const err = Error('none')
  return err.stack.split('\n').slice(4).filter( row => /rxjs/.test(row) === false )
}

export const formatValue = ( value:any ):string => {
  if ( 'string' === typeof value )
    return value
  if ( 'boolean' === typeof value )
    return value ? 'true' : 'false'
  if ( 'number' === typeof value )
    return `${value}`
  return JSON.stringify(value,null,'  ')
}

export const logMap = <T>( label?:string, ...labelArgs:string[] ) => {
  return ( value:T, idx?:number ) => {
    const t = typeof value
    const valueArgs = (typeof idx !== 'undefined') ? [ `${idx}`, `${t}` ]  : [`${t}`]
    const prefix = idx !== undefined ? ':%s\t(%s)\t'  : '(%s)\t'
    const format = label + prefix
    console.log( label, ...labelArgs, '\x1b[2m' + stack()[0] + '\x1b[0m' )
    console.log( prefix, ...valueArgs )
    console.log('---\n',formatValue(value),'\n---')
    return value
  }
}


export const logObservable = <T>( observable:Observable<T>, name?:string ): void => {

  const head = () => {
    console.log(`Observable`, name ? `(${name})` : '' )
  }

  const sub = observable.subscribe(
      (value) => {
         head()
         console.log('value',value)
      },
      (error)=>{
        head()
        console.error(error)
      },
      ()=>{
        head()
        console.log('done')
      }
    )

}