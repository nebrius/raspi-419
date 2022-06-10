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
var _Base_closed, _Base_target;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = exports.validateOpen = void 0;
// We put instances in a set to prevent them from being garbage collected until
// close() is called
const instances = new Set();
exports.validateOpen = Symbol();
class Base {
    constructor(options) {
        _Base_closed.set(this, false);
        _Base_target.set(this, void 0);
        __classPrivateFieldSet(this, _Base_target, options.target, "f");
        instances.add(this);
    }
    get target() {
        return __classPrivateFieldGet(this, _Base_target, "f");
    }
    close() {
        __classPrivateFieldSet(this, _Base_closed, true, "f");
        instances.delete(this);
    }
    [(_Base_closed = new WeakMap(), _Base_target = new WeakMap(), exports.validateOpen)]() {
        if (__classPrivateFieldGet(this, _Base_closed, "f")) {
            throw new Error('Cannot perform operation after closing');
        }
    }
}
exports.Base = Base;
//# sourceMappingURL=base.js.map