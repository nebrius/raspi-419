# raspi-419
An implementation of the ECMA-419 spec on the Raspberry Pi

Note: This project is abandoned. After digging through the spec, I realized that the Raspberry Pi isn't a good fit for this spec. The spec was primarily designed for bare metal or RTOS based microcontrollers, such as the Arduino and ESP families. On these platforms, it's important that APIs have low-latency, leading to a preference for synchronous operations. However, on multi-user operating systems such as Linux like the Raspberry Pi runs, this is inverted, where not tying up resources is more important than latency, leading to a preference for _asynchronous_ operations.

## Licsense

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
