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

// Implementation of https://419.ecma-international.org/#-10-io-classes-digital

import { Base, BaseProps, validateOpen } from './base';
import {
  LOW,
  HIGH,
  PULL_NONE,
  PULL_DOWN,
  PULL_UP,
  DigitalInput,
  DigitalOutput
} from 'raspi-gpio';
import { validateOptionsExists, validatePinExists } from './util';

type Value = typeof LOW | typeof HIGH;

interface DigitalProps extends BaseProps {
  pin: string | number;
  mode:
    | typeof Digital.Input
    | typeof Digital.InputPullUp
    | typeof Digital.InputPullDown
    | typeof Digital.Output;
  edge?:
    | typeof Digital.Rising
    | typeof Digital.Falling
    | typeof Digital.RisingAndFalling;
  onReadable?: (value: Value) => void;
  format?: 'number';
}

export class Digital extends Base {
  // Pin modes
  static Input = 1;
  static InputPullUp = 2;
  static InputPullDown = 3;
  static InputPullUpDown = 4;
  static Output = 5;
  static OutputOpenDrain = 6;

  // Edge for onReadable, must be a number because it's valid to do
  // Digital.Rising + Digital.Falling
  static Rising = 1;
  static Falling = 2;

  // Unnofficial extension to make TypeScript happy, must equal Rising + Falling
  static RisingAndFalling = 2;

  #gpio: DigitalInput | DigitalOutput;

  constructor(options: DigitalProps) {
    validateOptionsExists(options);
    if (
      ![
        Digital.Input,
        Digital.InputPullUp,
        Digital.InputPullDown,
        Digital.Output
      ].includes(options.mode)
    ) {
      throw new Error(
        `options.mode must be Digital.Input, Digital.InputPullUp, Digital.InputPullDown, or Digital.Output`
      );
    }
    if (
      options.edge !== undefined &&
      options.edge !== Digital.RisingAndFalling
    ) {
      throw new Error(
        `options.edge must be Digital.RisingAndFalling if supplied`
      );
    }
    if (options.onReadable && !options.edge) {
      throw new Error(
        `options.edge is required if options.onReadable is supplied`
      );
    }
    validatePinExists(options.pin);
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (options.format !== undefined && options.format !== 'number') {
      throw new Error(`options.format must be "number" if supplied`);
    }

    // Initialize the class
    super({
      target: options.target
    });

    // Initialize the internal pin implementation
    switch (options.mode) {
      case Digital.Input: {
        this.#gpio = new DigitalInput({
          pin: options.pin,
          pullResistor: PULL_NONE
        });
        break;
      }
      case Digital.InputPullUp: {
        this.#gpio = new DigitalInput({
          pin: options.pin,
          pullResistor: PULL_UP
        });
        break;
      }
      case Digital.InputPullDown: {
        this.#gpio = new DigitalInput({
          pin: options.pin,
          pullResistor: PULL_DOWN
        });
        break;
      }
      case Digital.Output: {
        this.#gpio = new DigitalOutput({
          pin: options.pin
        });
        break;
      }
      default: {
        throw new Error(
          `Internal Error: unhandled mode ${options.mode}. This is a bug.`
        );
      }
    }

    if (options.onReadable && this.#gpio instanceof DigitalInput) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      this.#gpio.on('change', options.onReadable);
    }
  }

  read() {
    this[validateOpen]();
    return this.#gpio.value;
  }

  write(value: Value) {
    this[validateOpen]();
    if (this.#gpio instanceof DigitalInput) {
      throw new Error(`Cannot write to an input`);
    }
    this.#gpio.write(value);
  }

  override close() {
    super.close();
    this.#gpio.destroy();
  }
}
