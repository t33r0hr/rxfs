
const prefix = 'rxfs'

export const log = ( format:string, ...args:any[] ) => {
  if ( process.env.NODE_ENV && process.env.NODE_ENV === 'debug' )
  {
    console.log(`\x1b[33m[%s]\x1b[0m ${format}`, prefix, ...args)
  }
}