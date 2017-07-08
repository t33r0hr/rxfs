import { Observable } from 'rxjs'
import * as path from 'path'
import * as rxshell from 'rxshell'
import { Writable } from './interfaces'



export type ExitCode = number

function renderData ( data:string|Buffer ):string {
  if ( 'string' === typeof data )
    return data
  return data.toString('utf8')
}


export interface ExecOptions {
  silent?: boolean
  args?: string[]
  cwd?: string
  stdout?: Writable
  stderr?: Writable
  bailOnStderr?: boolean
}

export function isExecOptions ( other:any ):other is ExecOptions {
  return ( 'object' === typeof other ) && (
      ( 'args' in other )
      ||
      ( 'silent' in other )
      ||
      ( 'cwd' in other )
      ||
      ( 'bailOnStderr' in other )
      ||
      ( 'stdout' in other )
      ||
      ( 'stderr' in other )
    )
}


export function isChildProcessOptions ( other:any ):other is rxshell.ChildProcessOptions<string|Buffer> {
  return ( 'command' in other )
}


function commandError ( command:rxshell.ChildProcessOptions<string|Buffer>, errors:string[] ):string {
  const params = rxshell.parseCommand(command.command)
  return `Failed to execute "${params.commandName} ${params.args.join(' ')}" at "${command.cwd}":
---------
${errors.join('\n---------\n')}`
}

export function exec <T extends rxshell.ChildProcessOptions<string|Buffer>>( command:T, args?:string[]|ExecOptions, options?:ExecOptions ):Observable<ExitCode>
export function exec <T extends string> ( command:T, args?:string[], options?:ExecOptions ):Observable<ExitCode>
export function exec <T extends string|rxshell.ChildProcessOptions<string|Buffer>> ( command:T, args?:string[]|ExecOptions, options?:ExecOptions ):Observable<ExitCode>
{
  let commandParams:rxshell.CommandParams
  let childProcessOptions:rxshell.ChildProcessOptions<string|Buffer>

  if ( 'string' === typeof command )
  {
    const cmd:rxshell.CommandParams = rxshell.parseCommand(<string>command)

    return exec<rxshell.ChildProcessOptions<string|Buffer>>({command: cmd},args,options)
  }
  if ( isChildProcessOptions(command) )
  {
    commandParams = rxshell.parseCommand(command.command)
  }

  childProcessOptions = {
    command: commandParams
  }

  if ( args && isExecOptions(args) )
  {
    options = args
  }
  else if ( Array.isArray(args) )
    commandParams.args.push(...args)

  if ( isExecOptions(options) )
  {
    if ( 'cwd' in options )
    {
      childProcessOptions.cwd = options.cwd
    }
    if ( 'args' in options )
    {
      commandParams.args.push(...options.args)
    }
  }
  else {
    options = {}
  }

  const bSilent:boolean = options.silent === true
  const bBailOnStderr:boolean = options.bailOnStderr === true
  const cwd = childProcessOptions.cwd  || process.cwd()

  const stdout:Writable = options.stdout || process.stdout
  const stderr:Writable = options.stderr || process.stderr

  const errors:string[] = []
  let errorBuffer:string

  const ebufDrain = ( ) => {
    if ( errorBuffer )
      errors.push(errorBuffer)
    errorBuffer = undefined
  }

  const ebufAdd = ( row:string|Buffer ) => {
    if ( !errorBuffer )
      errorBuffer = ''
    errorBuffer += renderData(row)
    if ( !bSilent || options.stderr )
    {
      stderr.write(row)
    }
  }

  const shouldBail = () => {
    return ( errors.length > 0 && bBailOnStderr )
  }

  return rxshell.exec(childProcessOptions,true).map ( (data,idx:number) => {
    if ( shouldBail() && data.stdout )
      return Observable.throw(new Error(commandError(childProcessOptions,errors)))
    if ( data.stderr )
    {
      ebufAdd(data.stdout)
      return ''
    }
    const out = renderData(data.stdout)
    if ( !bSilent || options.stdout )
    {
      stdout.write(data.stdout)
    }
    return out
  } ).toArray().map ( rows => {
    return 0
  } )

}