/// <reference types="node" />
import { Base, BaseProps } from './base';
interface I2CProps extends BaseProps {
    address: number;
    hz: number;
}
export declare class I2C extends Base {
    #private;
    static default: {
        hz: number;
    };
    constructor(options: I2CProps);
    read(readLengthOrReadBuffer: number | Buffer, stop?: 0 | 1): void;
    write(buffer: Buffer, stop?: 0 | 1): void;
}
export {};
