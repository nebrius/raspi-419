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

import { Base, BaseProps, validateOpen } from './base';
import { validatePinExists } from './util';
import { SoftPWM } from 'raspi-soft-pwm';

interface PWMProps extends BaseProps {
  pin: string | number;
  hz?: number;
}

export class PWM extends Base {
  #pwm: SoftPWM;

  get resolution() {
    return this.#pwm.range;
  }

  constructor(options: PWMProps) {
    // These checks need to work for vanilla JavaScript users as well as
    // TypeScript users, so we have to check things that are impossible in TypeScript
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!options) {
      throw new Error('options is required');
    }
    validatePinExists(options.pin);
    // Won't be undefined cause of the isInteger check
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (!Number.isInteger(options.hz) || options.hz! < 0) {
      throw new Error(
        'options.hz must be an integer greater than 0 if supplied'
      );
    }

    super({
      target: options.target
    });

    this.#pwm = new SoftPWM({
      pin: options.pin,
      ...(options.hz ? { frequency: options.hz } : {})
    });
  }

  read() {
    this[validateOpen]();
    return Math.round(this.#pwm.dutyCycle * this.resolution);
  }

  write(data: number) {
    this[validateOpen]();
    this.#pwm.write(data / this.resolution);
  }
}
