import { Observable } from 'rxjs/Observable'
import { Flags } from './interfaces'
import { spawn, spawnProcess, RxProcess, RxProcessResult } from './spawn'
import { command } from './execCommand'
import { stat } from './stat'
import * as debug from './debug'
import * as fs from 'fs'

export const defaultFlags:Flags = {
  c: false,
  m: true,
  a: true,
  f: false,
  h: true
}
export type TouchFlags = typeof defaultFlags

export type TouchOptions = {
  [K in keyof TouchFlags]?: TouchFlags[K]
}

function parseFlags ( options?:TouchOptions ):string|void {
  if ( !options )
    return undefined

  const flagArgs = Object.keys(options||{}).filter ( k => options[k] )
  if ( flagArgs.length > 0 )
    return `-${flagArgs.join('')}`
}


export const touch_command = command('touch')

export function touch ( filepath:string, flags?:TouchOptions ) {

  const args = [parseFlags(flags),filepath].filter(v=>!!v)
  const touchCommand = `touch ${args.join(' ')}`
  debug.log('%s',touchCommand)

  return touch_command(...args).concatMap( result => {
    //debug.log('touch_command result', result)
    return stat(filepath)
  })
}

export function _touch ( filepath:string, flags?:TouchOptions ) {

  const flagArgs = Object.keys(flags||{}).filter ( k => flags[k] )
  const args = flagArgs.length ? [('-'+flagArgs.join(''))] : []
  args.push(filepath)
  const touchCommand = `touch ${args.join(' ')}`
  //debug.log('$ %s',touchCommand)
  return spawnProcess('touch',args).take(1)
    .concatMap ( (proc:RxProcess) => {
      return proc.close
    } )
    .flatMap ( result => {
      if ( result.exitCode !== 0 )
      {
        const message = result.stderr
        debug.log('error', message)
        return Observable.throw(new Error(`Failed to touch ${filepath}. ${message}`))
      }
      return Observable.of(filepath)
    } )
    .flatMap ( filepath => {
      //debug.log('stats for: "%s"',filepath)
      return Observable.concat(stat(filepath),Observable.empty())
    } )
}