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

// Implementation of https://419.ecma-international.org/#-10-io-classes-ic

import { I2C as RaspiI2C } from 'raspi-i2c';
import { Base } from './base';

interface I2CProps {
  address: number;
}

let i2c: RaspiI2C | undefined;

export class I2C extends Base {
  // The Raspberry Pi doesn't support data, clock, hz, or port, so our defaults are empty
  static default = {};

  #address: number;
  constructor(options: I2CProps) {
    // These checks need to work for vanilla JavaScript users as well as
    // TypeScript users, so we have to check things that are impossible in TypeScript
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!options) {
      throw new Error('options is required');
    }
    // This is a check for vanilla JavaScript users that might supply this unsupported property
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    if ((options as any).data !== undefined) {
      throw new Error(`options.data is not supported on the Raspberry Pi`);
    }
    // This is a check for vanilla JavaScript users that might supply this unsupported property
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    if ((options as any).clock !== undefined) {
      throw new Error(`options.clock is not supported on the Raspberry Pi`);
    }
    // This is a check for vanilla JavaScript users that might supply this unsupported property
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    if ((options as any).hz !== undefined) {
      throw new Error(`options.hz is not supported on the Raspberry Pi`);
    }
    // This is a check for vanilla JavaScript users that might supply this unsupported property
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    if ((options as any).port !== undefined) {
      throw new Error(`options.port is not supported on the Raspberry Pi`);
    }

    // Initialize the class
    super();
    this.#address = options.address;

    // Initialize I2C if it hasn't been initialized already
    if (!i2c) {
      i2c = new RaspiI2C();
    }
  }
}
