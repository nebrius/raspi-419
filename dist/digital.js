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
var _Digital_gpio;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Digital = void 0;
// Implementation of https://419.ecma-international.org/#-10-io-classes-digital
const base_1 = require("./base");
const raspi_gpio_1 = require("raspi-gpio");
const util_1 = require("./util");
class Digital extends base_1.Base {
    constructor(options) {
        (0, util_1.validateOptionsExists)(options);
        if (![
            Digital.Input,
            Digital.InputPullUp,
            Digital.InputPullDown,
            Digital.Output
        ].includes(options.mode)) {
            throw new Error(`options.mode must be Digital.Input, Digital.InputPullUp, Digital.InputPullDown, or Digital.Output`);
        }
        if (options.edge !== undefined &&
            options.edge !== Digital.RisingAndFalling) {
            throw new Error(`options.edge must be Digital.RisingAndFalling if supplied`);
        }
        if (options.onReadable && !options.edge) {
            throw new Error(`options.edge is required if options.onReadable is supplied`);
        }
        (0, util_1.validatePinExists)(options.pin);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (options.format !== undefined && options.format !== 'number') {
            throw new Error(`options.format must be "number" if supplied`);
        }
        // Initialize the class
        super({
            target: options.target
        });
        _Digital_gpio.set(this, void 0);
        // Initialize the internal pin implementation
        switch (options.mode) {
            case Digital.Input: {
                __classPrivateFieldSet(this, _Digital_gpio, new raspi_gpio_1.DigitalInput({
                    pin: options.pin,
                    pullResistor: raspi_gpio_1.PULL_NONE
                }), "f");
                break;
            }
            case Digital.InputPullUp: {
                __classPrivateFieldSet(this, _Digital_gpio, new raspi_gpio_1.DigitalInput({
                    pin: options.pin,
                    pullResistor: raspi_gpio_1.PULL_UP
                }), "f");
                break;
            }
            case Digital.InputPullDown: {
                __classPrivateFieldSet(this, _Digital_gpio, new raspi_gpio_1.DigitalInput({
                    pin: options.pin,
                    pullResistor: raspi_gpio_1.PULL_DOWN
                }), "f");
                break;
            }
            case Digital.Output: {
                __classPrivateFieldSet(this, _Digital_gpio, new raspi_gpio_1.DigitalOutput({
                    pin: options.pin
                }), "f");
                break;
            }
            default: {
                throw new Error(`Internal Error: unhandled mode ${options.mode}. This is a bug.`);
            }
        }
        if (options.onReadable && __classPrivateFieldGet(this, _Digital_gpio, "f") instanceof raspi_gpio_1.DigitalInput) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            __classPrivateFieldGet(this, _Digital_gpio, "f").on('change', options.onReadable);
        }
    }
    read() {
        this[base_1.validateOpen]();
        return __classPrivateFieldGet(this, _Digital_gpio, "f").value;
    }
    write(value) {
        this[base_1.validateOpen]();
        if (__classPrivateFieldGet(this, _Digital_gpio, "f") instanceof raspi_gpio_1.DigitalInput) {
            throw new Error(`Cannot write to an input`);
        }
        __classPrivateFieldGet(this, _Digital_gpio, "f").write(value);
    }
    close() {
        super.close();
        __classPrivateFieldGet(this, _Digital_gpio, "f").destroy();
    }
}
exports.Digital = Digital;
_Digital_gpio = new WeakMap();
// Pin modes
Digital.Input = 1;
Digital.InputPullUp = 2;
Digital.InputPullDown = 3;
Digital.InputPullUpDown = 4;
Digital.Output = 5;
Digital.OutputOpenDrain = 6;
// Edge for onReadable, must be a number because it's valid to do
// Digital.Rising + DIgital.Falling
Digital.Rising = 1;
Digital.Falling = 2;
// Unnofficial extension to make TypeScript happy, must equal Rising + Falling
Digital.RisingAndFalling = 2;
//# sourceMappingURL=digital.js.map