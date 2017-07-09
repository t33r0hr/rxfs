
export interface ExecData {
  index?:number;
  stderr:Buffer;
  stdout:Buffer;
}


export interface Writable {
  write(data:string|Buffer):void
}

export type FlagValue = boolean|string|number

export interface Flags {
  [key: string]: FlagValue|FlagValue[]
}