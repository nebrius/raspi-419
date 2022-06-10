import { Base, BaseProps } from './base';
interface PWMProps extends BaseProps {
    pin: string | number;
    hz?: number;
}
export declare class PWM extends Base {
    #private;
    get resolution(): number;
    constructor(options: PWMProps);
    read(): number;
    write(data: number): void;
}
export {};
