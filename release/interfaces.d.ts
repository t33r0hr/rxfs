/// <reference types="node" />
export interface ExecData {
    index?: number;
    stderr: Buffer;
    stdout: Buffer;
}
export interface Writable {
    write(data: string | Buffer): void;
}
