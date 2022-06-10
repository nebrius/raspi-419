export declare const validateOpen: unique symbol;
export interface BaseProps {
    target: unknown;
}
export declare class Base {
    #private;
    get target(): unknown;
    constructor(options: BaseProps);
    close(): void;
    [validateOpen](): void;
}
