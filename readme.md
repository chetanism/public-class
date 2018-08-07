#public-class

A small utility to wrap your es6 classes or es5 constructor functions to provide public and private access levels.
Existing classes or constructor functions can be used with `public-class` as is.

## Installation
`npm i public-class --save`

## Usage
### ES6
```ecmascript 6
const createPublicClass = require('public-class').createPublicClass

class _YourClass {
  constructor() {
    this.privateData = 1
    this.publicData = 2
  }
  
  privateMethod() {/* may use other public/private members as ususal */}
  publicMethod() {/* may use other public/private members as ususal */}
}

const YourClass = createPublicClass(_YourClass, ['publicData', 'publicMethod'])

const yourObj = new YourClass()

yourObj.privateData
// => undefined
yourObj.privateMethod
// => undefined
yourObj.publicData
// => 2
yourObj.publicMethod
// Function: publicMethod
```
### ES5
```javascript
const createPublicClass = require('public-class').createPublicClass

function _YourClass() {
  this.privateData = 1
  this.publicData = 2
}

_YourClass.prototype.privateMethod = function () {/* may use other public/private members as ususal */}
_YourClass.prototype.publicMethod = function () {/* may use other public/private members as ususal */}

const YourClass = createPublicClass(_YourClass, ['publicData', 'publicMethod'])

const yourObj = new YourClass()

yourObj.privateData
// => undefined
yourObj.privateMethod
// => undefined
yourObj.publicData
// => 2
yourObj.publicMethod
// Function: publicMethod
```
### Decorators
`public-class` can also be used as a decorator:
```ecmascript 6
const publicClass = require('public-class').publicClass

@publicClass(['publicdata', 'publicMethod'])
class YourClass {
  /* */
}
```
