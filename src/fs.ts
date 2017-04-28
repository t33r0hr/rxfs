import * as fs from 'fs'
import * as path from 'path'
import { fromReadable } from './from'
import { mkdir as mkd } from 'shelljs'
import { Observable, Subscription, Observer, Scheduler } from 'rxjs'


const promisify = ( method:Function ) => ( ...args:any[] ) => {
  return new Promise((resolve,reject)=>{
    const result = method ( ...args, ( error:any, ...results:any[] ) => {
      if ( error )
      {
        reject(error)
      }
      else 
      {
        const [ payload=result, ...resultArgs ] = results
        resolve( payload )
      }
    } )
  })
}

//export * from 'fs'

export const statSync = ( filename:Buffer|string ):fs.Stats => {
  let stat
  try{
    stat = fs.statSync(filename)
  }catch(e){}
  return stat 
}

export const existsSync = ( filename:string|Buffer ):boolean => {
  return !!statSync(filename)
}

export const async = {
  stat: promisify(fs.stat),
  mkdir: (filepath:string,p?:boolean) => Promise.resolve(p ? mkd('-p',filepath) : mkd(filepath)),
  readFile: promisify(fs.readFile),
  unlink: promisify(fs.unlink),
  writeFile: promisify(fs.writeFile),
  readdir: promisify(fs.readdir)
}

export const readfileFull = ( filepath:string, full:boolean=false ):Observable<string> => {
  if ( full )
  {
    return Observable.fromPromise(async.readFile(filepath))
  }
  return fromReadable(fs.createReadStream(filepath,{
    encoding: 'utf8'
  })).map(buffer => buffer.toString()).concat()
}

export const readFile = ( filename:string, ...args:any[] ):Observable<string> => {
  return Observable.fromPromise(async.readFile(filename,...args))
}

export const writeFile = ( filename:string, content:Buffer|string, ...args:any[] ):Observable<string> => {
  return Observable.fromPromise(
    async.writeFile(filename,content,...args)
      .then ( () => filename )
      .catch ( error => {
        console.error ( `writeFile(${filename}) failed with error: ${error}` )
      } )
  )
}

export const readfile = ( filepath:string, full:boolean=false ):Observable<string> => {
  if ( full )
  {
    return readFile ( filepath )
  }
  return fromReadable(fs.createReadStream(filepath,{
    encoding: 'utf8'
  })).map(buffer => buffer.toString()).concat()
}

/**
 * read contents of a directory
 * @param  {string}             dirname path to directory
 * @return {Observable<string>}          observable emitting contents of directory
 */
export function readDir( dirname:string ):Observable<string> {
  return Observable.fromPromise(async.readdir(dirname).catch(error=>Promise.resolve([]))).concat()
}

export const readstats = ( filepath:string ):Observable<fs.Stats> => Observable.fromPromise(async.stat(filepath))

export const unlink = ( filepath:string ):Observable<boolean> => Observable.fromPromise(
  async.unlink(filepath).then ( () => true )
)

export const mkdir = ( filepath:string ):Observable<string> => Observable.fromPromise(async.mkdir(filepath).then(()=>filepath))