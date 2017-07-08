import { Observable, Subject } from 'rxjs'
import { exec, ExitCode, ExecResult } from './exec'


export interface RxProcess {
  stdout: Observable<Buffer>
  stderr: Observable<Buffer>
  close: Observable<ExecResult>
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