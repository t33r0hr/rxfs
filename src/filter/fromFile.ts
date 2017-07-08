import { Observable } from 'rxjs'
import { FileFilter } from './interfaces'
import { readFile } from '../readFile'
import * as extglob from 'extglob'


export function parseRegExpr ( source:string ):RegExp {
  const exp = extglob(source)
  return new RegExp(exp)
}

export function fromFile ( filepath:string, include:boolean=false ) {
  return readFile(filepath,'utf8').toArray().concatMap ( rows => Observable.of(...rows.join('\n').split('\n')) )
      .filter ( row => row && row.substr(0,1) !== '#' && row.substr(0,1) !== '.' )
      .map ( row => parseRegExpr(row) )
      .filter ( row => !!row )
      .toArray()
      .map ( rxs => {
        return ( other:any, idx?:number ) => {
          const rx = rxs.find ( reg => reg.test(other) === true )
          if ( rx )
          {
            console.log('rx matched', rx, other)
          }
          return (rx === undefined) === !include
        }
      } )
}