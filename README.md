# ripple-jQuery

Simple plugin for ripple effect, built using jQuery.

[Demo](https://plnkr.co/edit/SIR7m29lWHwOW6S564eX?p=preview)

# Install
```bash
npm install ripple-jquery --save
```

# Usage

```js
require('ripple-jQuery')

const options = {
bgColor: 'mistyrose', //default is rgba(0,0,0,0.2),
time: 1000 //default is 500
}

$(selector).ripple(options);
```

To `disable` ripple, do following

`$(selector).disableRipple()`

To `re-enable` ripple after being disabled, do following

`$(selector).enableRipple()`
