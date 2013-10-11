arb
===

**arb** is a lightwheight boilerplate to [AngularJS](http://angularjs.org),
[RequireJS](http://requirejs.org)
and [Twitter Bootstrap](http://getbootstrap.com).

The purpose of this boilerplate is to bring the power of AngularJS to extend
HTML vocabulary, ease in loading modules via
[AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) RequireJS and agility to
create layout of Twitter Bootstrap.

### Env requirements

- [Node.js](http://nodejs.org) / [npm](http://npmjs.org)
- [bower](http://bower.io)
- [Grunt](http://gruntjs.com)

### Instalation

```shell
git clone git://github.com/joaoneto/arb.git
cd arb && npm install
```

The `npm install`, install the dependencies contained in the `packades.json`.
After `npm install`, will run the `postinstall`, which is the Grunt task
`install`, which installs the dependencies contained in the `bower.json` and
only copies the necessary files to the folder `public/assets`.

### Init server

```shell
$ npm start
```

### License

The MIT License (MIT)

Copyright (c) 2013 João Neto

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
