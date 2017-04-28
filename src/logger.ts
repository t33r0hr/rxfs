

export const logMap = <T>( label?:string ) => {
  return ( value:T, idx?:number ) => {
    const t = typeof value
    const args = idx !== undefined ? [ idx, t, value ]  : [t, value]
    const prefix = idx !== undefined ? ':%s\t(%s)\t'  : '(%s)\t'
    console.log( label + prefix, ...args )
    return value
  }
}