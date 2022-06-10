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
var _PWM_pwm;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PWM = void 0;
const base_1 = require("./base");
const util_1 = require("./util");
const raspi_soft_pwm_1 = require("raspi-soft-pwm");
class PWM extends base_1.Base {
    constructor(options) {
        // These checks need to work for vanilla JavaScript users as well as
        // TypeScript users, so we have to check things that are impossible in TypeScript
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!options) {
            throw new Error('options is required');
        }
        (0, util_1.validatePinExists)(options.pin);
        // Won't be undefined cause of the isInteger check
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (!Number.isInteger(options.hz) || options.hz < 0) {
            throw new Error('options.hz must be an integer greater than 0 if supplied');
        }
        super({
            target: options.target
        });
        _PWM_pwm.set(this, void 0);
        __classPrivateFieldSet(this, _PWM_pwm, new raspi_soft_pwm_1.SoftPWM({
            pin: options.pin,
            ...(options.hz ? { frequency: options.hz } : {})
        }), "f");
    }
    get resolution() {
        return __classPrivateFieldGet(this, _PWM_pwm, "f").range;
    }
    read() {
        this[base_1.validateOpen]();
        return Math.round(__classPrivateFieldGet(this, _PWM_pwm, "f").dutyCycle * this.resolution);
    }
    write(data) {
        this[base_1.validateOpen]();
        __classPrivateFieldGet(this, _PWM_pwm, "f").write(data / this.resolution);
    }
}
exports.PWM = PWM;
_PWM_pwm = new WeakMap();
//# sourceMappingURL=pwm.js.map