"use strict";
/*
MIT License

Copyright (c) Bryan Hughes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _I2C_address;
Object.defineProperty(exports, "__esModule", { value: true });
exports.I2C = void 0;
// Implementation of https://419.ecma-international.org/#-10-io-classes-ic
const fs_1 = require("fs");
const raspi_i2c_1 = require("raspi-i2c");
const base_1 = require("./base");
const ini_builder_1 = require("ini-builder");
let i2c;
// Read the baudrate from the system config
const bootConfig = (0, ini_builder_1.parse)((0, fs_1.readFileSync)('/boot/config.txt').toString(), {
    commentDelimiter: '#'
});
const i2c_arm_baudrate = (0, ini_builder_1.find)(bootConfig, ['dtparam', 'i2c_arm_baudrate']);
if (!i2c_arm_baudrate || !('value' in i2c_arm_baudrate)) {
    throw new Error('Could not parse I2C baudrate from boot config');
}
const BAUDRATE = parseInt(i2c_arm_baudrate.value);
class I2C extends base_1.Base {
    constructor(options) {
        // These checks need to work for vanilla JavaScript users as well as
        // TypeScript users, so we have to check things that are impossible in TypeScript
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!options) {
            throw new Error('options is required');
        }
        // These checks are for vanilla JavaScript users that might supply unsupported properties
        /* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any */
        if (options.data !== undefined) {
            throw new Error(`options.data is not supported on the Raspberry Pi`);
        }
        if (options.clock !== undefined) {
            throw new Error(`options.clock is not supported on the Raspberry Pi`);
        }
        if (options.port !== undefined) {
            throw new Error(`options.port is not supported on the Raspberry Pi`);
        }
        /* eslint-enable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any */
        if (options.hz !== BAUDRATE) {
            throw new Error(`options.hz must be set to ${BAUDRATE}`);
        }
        // Initialize the class
        super({
            target: options.target
        });
        _I2C_address.set(this, void 0);
        __classPrivateFieldSet(this, _I2C_address, options.address, "f");
        // Initialize I2C if it hasn't been initialized already
        if (!i2c) {
            i2c = new raspi_i2c_1.I2C();
        }
    }
    read(readLengthOrReadBuffer, stop = 1) {
        this[base_1.validateOpen]();
        if (!i2c) {
            throw new Error('Internal Error: i2c is unexpectedly undefined. This is a bug');
        }
        if (stop !== 1) {
            throw new Error('I2C#read must have a stop bit of 1 on the Raspberry Pi');
        }
        if (typeof readLengthOrReadBuffer !== 'number' &&
            !(readLengthOrReadBuffer instanceof Buffer)) {
            throw new Error('readLengthOrReadBuffer must be a Buffer or a number representing the length of a buffer');
        }
        const readLength = typeof readLengthOrReadBuffer === 'number'
            ? readLengthOrReadBuffer
            : readLengthOrReadBuffer.length;
        i2c.read(__classPrivateFieldGet(this, _I2C_address, "f"), readLength, (err, data) => {
            // TODO: this needs to be asynchronous to perform the actual read, but how?
        });
    }
    write(buffer, stop = 1) {
        this[base_1.validateOpen]();
        if (!i2c) {
            throw new Error('Internal Error: i2c is unexpectedly undefined. This is a bug');
        }
        if (stop !== 1) {
            throw new Error('I2C#read must have a stop bit of 1 on the Raspberry Pi');
        }
        i2c.write(__classPrivateFieldGet(this, _I2C_address, "f"), buffer, (err) => {
            // TODO: this needs to be asynchronous to perform the actual write, but how?
        });
    }
}
exports.I2C = I2C;
_I2C_address = new WeakMap();
// The Raspberry Pi doesn't support data, clock, or port, so our defaults are pretty empty
I2C.default = {
    hz: BAUDRATE
};
//# sourceMappingURL=i2c.js.map