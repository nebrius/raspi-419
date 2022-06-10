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

import { readFileSync } from 'fs';
import { I2C as RaspiI2C } from 'raspi-i2c';
import { Base, BaseProps, validateOpen } from './base';
import { parse, find } from 'ini-builder';

interface I2CProps extends BaseProps {
  address: number;
  hz: number;
}

let i2c: RaspiI2C | undefined;

// Read the baudrate from the system config
const bootConfig = parse(readFileSync('/boot/config.txt').toString(), {
  commentDelimiter: '#'
});
const i2c_arm_baudrate = find(bootConfig, ['dtparam', 'i2c_arm_baudrate']);
if (!i2c_arm_baudrate || !('value' in i2c_arm_baudrate)) {
  throw new Error('Could not parse I2C baudrate from boot config');
}
const BAUDRATE = parseInt(i2c_arm_baudrate.value);

export class I2C extends Base {
  // The Raspberry Pi doesn't support data, clock, or port, so our defaults are pretty empty
  static default = {
    hz: BAUDRATE
  };

  #address: number;
  constructor(options: I2CProps) {
    // These checks need to work for vanilla JavaScript users as well as
    // TypeScript users, so we have to check things that are impossible in TypeScript
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!options) {
      throw new Error('options is required');
    }
    // These checks are for vanilla JavaScript users that might supply unsupported properties
    /* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any */
    if ((options as any).data !== undefined) {
      throw new Error(`options.data is not supported on the Raspberry Pi`);
    }
    if ((options as any).clock !== undefined) {
      throw new Error(`options.clock is not supported on the Raspberry Pi`);
    }
    if ((options as any).port !== undefined) {
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
    this.#address = options.address;

    // Initialize I2C if it hasn't been initialized already
    if (!i2c) {
      i2c = new RaspiI2C();
    }
  }

  read(readLengthOrReadBuffer: number | Buffer, stop: 0 | 1 = 1) {
    this[validateOpen]();
    if (!i2c) {
      throw new Error(
        'Internal Error: i2c is unexpectedly undefined. This is a bug'
      );
    }
    if (stop !== 1) {
      throw new Error('I2C#read must have a stop bit of 1 on the Raspberry Pi');
    }
    if (
      typeof readLengthOrReadBuffer !== 'number' &&
      !(readLengthOrReadBuffer instanceof Buffer)
    ) {
      throw new Error(
        'readLengthOrReadBuffer must be a Buffer or a number representing the length of a buffer'
      );
    }
    const readLength =
      typeof readLengthOrReadBuffer === 'number'
        ? readLengthOrReadBuffer
        : readLengthOrReadBuffer.length;
    i2c.read(this.#address, readLength, (err, data) => {
      // TODO: this needs to be asynchronous to perform the actual read, but how?
    });
  }

  write(buffer: Buffer, stop: 0 | 1 = 1) {
    this[validateOpen]();
    if (!i2c) {
      throw new Error(
        'Internal Error: i2c is unexpectedly undefined. This is a bug'
      );
    }
    if (stop !== 1) {
      throw new Error('I2C#read must have a stop bit of 1 on the Raspberry Pi');
    }
    i2c.write(this.#address, buffer, (err) => {
      // TODO: this needs to be asynchronous to perform the actual write, but how?
    });
  }
}
