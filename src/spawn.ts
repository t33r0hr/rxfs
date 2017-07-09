import { Observable, Subject } from 'rxjs'
import { ChildProcess, StderrData, StdoutData, StreamData } from 'rxshell'

import { exec, ExitCode, ExecResult } from './exec'

export function isStderrData <T extends Buffer|string> ( other:any ):other is StderrData<T> {
  return ( 
    'object' === typeof other
    &&
    'stderr' in other 
  )
}
export function isStdoutData <T extends Buffer|string> ( other:any ):other is StdoutData<T> {
  return ( 
    'object' === typeof other
    &&
    'stdout' in other 
  )
}

export interface RxProcess {
  stdout: Observable<Buffer>
  stderr: Observable<Buffer>
  close: Observable<ExecResult>
}

export interface RxProcessResult {
  exitCode: ExitCode
  errors?: any[]
  data?: any
}

export function spawnProcess ( command:string, args:string[], cwd:string=process.cwd() ):Observable<RxProcess> {
  const childProcess = new ChildProcess({
    command: {
      commandName: command,
      args
    },
    cwd
  })
  
  const processWrapper = childProcess.wrap()

  const stderrBuffer:Buffer[] = []
  const stderr = processWrapper.stderr.takeUntil(processWrapper.end).shareReplay()
  const closeSource:Observable<RxProcessResult> = processWrapper.end.flatMap( exitCode => {
    if ( exitCode !== 0 )
    {
      return stderr.map( buf => buf.toString('utf8')).toArray().map ( errors => {
        return {
          exitCode,
          errors
        }
      })
    }
    else 
    {
      return Observable.of({
        exitCode
      })
    }
  } )

  return Observable.of({
    stdout: processWrapper.stdout.takeUntil(processWrapper.end),
    stderr: processWrapper.stderr.takeUntil(processWrapper.end),
    close: closeSource
  })
}

export function spawn ( command:string, args:string[], cwd:string=process.cwd() ):Observable<RxProcess> {

  const stdoutSubject:Subject<Buffer> = new Subject()
  const stderrSubject:Subject<Buffer> = new Subject()


  const stdout:Buffer[] = []
  const stdoutSub = stdoutSubject.subscribe ( data => {
    stdout.push(data)
  } )

  const stderr:Buffer[] = []
  const stderrSub = stderrSubject.subscribe ( data => {
    stderr.push(data)
  } )


  const closeSource = exec(command,args,{
    stdout: {
      write: stdoutSubject.next.bind(stdoutSubject)
    },
    stderr: {
      write: stderrSubject.next.bind(stderrSubject)
    }
  }).map ( (exitCode:ExitCode):ExecResult => {
    return {
      exitCode,
      stdout: stdout,
      stderr: stderr
    }
  } )

  const processOut:RxProcess = {
    stdout: stdoutSubject.asObservable().shareReplay().takeUntil(closeSource),
    stderr: stderrSubject.asObservable().shareReplay().takeUntil(closeSource),
    close: closeSource
  }

  return Observable.of(processOut)
}