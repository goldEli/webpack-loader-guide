## Webpack Loader Guide

> Learn webpack loader with a few examples.

### Development setup

```
npm install

npm run dev
```

### Examples:

**Create a loader**

> this loader's function is removing all `'debugger'` from resource code.

```JavaScript
// removeDebuggerLoader.js
module.exports = function(source, map) {
  this.callback(
      null,
      source.replace(/debugger/g, ''),
      map
  );
};
```

**Use**

```JavaScript
// webpack.config

...
...
...
rules: [
  {
    test: /\.js$/,
    loader: require.resolve('./loader/removeDebuggerLoader.js'),
  }
]
...
...
...
```

### Result

```JavaScript
// source code: index.js

function component() {
  const element = document.createElement('div');
  console.log(123)
  debugger
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  return element;
}

document.body.appendChild(component());
```

```
npm run dev
```

```JavaScript
// compiled code:

function component() {
  const element = document.createElement('div');
  console.log(123)
  
  element.innerHTML = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  return element;
}

document.body.appendChild(component());
```

All `'debugger'` from resource code have been removed.
