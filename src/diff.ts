import { Observable } from 'rxjs'
import * as path from 'path'
import { logMap } from './logger'

import { exists } from './exists'
import { exec } from './exec'
import { spawn } from './spawn'
import { file as tmpFile } from './tmp'

export const diff = ( opts?:any, ...targets:string[] ) => {
  if ( 'string' === typeof opts )
  {
    return diff ( {}, opts, ...targets )
  }
  
  const parser = diffParser()

  const mapTarget = ( targetFilepath:string ):Observable<string> => {
    return exists(targetFilepath).switchMap ( ex => (
        ex ? Observable.of(targetFilepath) : tmpFile(targetFilepath)
      ) 
    )
  }

  return Observable
    .from(targets)
    .flatMap( mapTarget )
    .toArray()
    .concatMap ( filenames => {
      return spawn('diff',filenames)
    } )
    .flatMap((proc)=>{
      return proc.stdout.map ( row => parser.parse(row.toString('utf8')) ).ignoreElements().concat(proc.close)
    })
    .map ( result => {
      return parser.result()
    } )
  
}

const rx_index = /^(.+)c(.+)$/gm
const rx_leftRow = /^\>\ (.+)$/gm
const rx_rightRow = /^\<\ (.+)$/gm

const diffParser = ( ) => {
  const diffs = []

  let diffIndex = 0
  let currentDiff = null

  return {
    parse: ( row:string ) => {
      if ( rx_index.test(row) )
      {
        currentDiff = {
          index: row.match(rx_index)[0],
          leftRows: [],
          rightRows: [],
        }
        diffs.push(currentDiff)
      }
      if ( currentDiff )
      {
        if ( rx_leftRow.test (row) )
        {
          currentDiff.leftRows.push(row.substr(2))
        }
        else if ( rx_rightRow.test (row) )
        {
          currentDiff.rightRows.push(row.substr(2))
        }
      }
      return row
    },
    result: () => {
      return diffs.slice()
    }
  }

}


export const parseDiff = ( source:string ) => {

  const rx_index = /^(.+)c(.+)$/gm
  const rx_leftRow = /^\>\ (.+)$/gm

  const matches = []
  do {

    const match = rx_index.exec(source)
    if ( !match )
      break
    
    const [ full, leftIndex, rightIndex ] = match
    const leftRowMatches = source.slice(match.index+match.length).match(rx_leftRow)
    matches.push({full,leftIndex, rightIndex, leftRowMatches})
  }while(true)

  return matches

}