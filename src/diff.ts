import { Observable } from 'rx'
import * as path from 'path'
import { logMap } from './logger'

import { exists } from './'
import { exec, StreamData } from 'rxshell'
import { file as tmpFile } from './tmp'

export const diff = ( opts?:any, ...targets:string[] ) => {
  if ( 'string' === typeof opts )
  {
    return diff ( {}, opts, ...targets )
  }
  
  const parser = diffParser()

  return Observable
    .from(targets)
    .flatMap(
      target => {
        return exists ( target ).flatMap ( doesExist => {
          if ( doesExist )
            return Observable.of(target)
          return tmpFile(target)
        } )
      }
    )
    .toArray()
    .map ( filenames => {
      return {
        command: {
          commandName: 'diff',
          args: filenames
        }
      }
    } )
    .concatMap ( command => exec(command) )
    .flatMap((out:StreamData<Buffer>)=>{
      if ( out.stderr )
      {
        return Observable.throw(out.stderr.toString())
      }
      /*if ( !out.stdout )
      {
        console.warn('no data on stdout', out)
      }*/
      return Observable.of(parser.parse(out.stdout ? out.stdout.toString() : ''))
    })
    .toArray()
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