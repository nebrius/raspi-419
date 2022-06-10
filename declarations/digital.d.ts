import { Base, BaseProps } from './base';
import { LOW, HIGH } from 'raspi-gpio';
declare type Value = typeof LOW | typeof HIGH;
interface DigitalProps extends BaseProps {
    pin: string | number;
    mode: typeof Digital.Input | typeof Digital.InputPullUp | typeof Digital.InputPullDown | typeof Digital.Output;
    edge?: typeof Digital.Rising | typeof Digital.Falling | typeof Digital.RisingAndFalling;
    onReadable?: (value: Value) => void;
    format?: 'number';
}
export declare class Digital extends Base {
    #private;
    static Input: number;
    static InputPullUp: number;
    static InputPullDown: number;
    static InputPullUpDown: number;
    static Output: number;
    static OutputOpenDrain: number;
    static Rising: number;
    static Falling: number;
    static RisingAndFalling: number;
    constructor(options: DigitalProps);
    read(): number;
    write(value: Value): void;
    close(): void;
}
export {};
