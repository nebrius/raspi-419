export declare const closed: unique symbol;
export declare class Base {
    [closed]: boolean;
    constructor();
    close(): void;
}
