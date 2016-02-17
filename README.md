# React Firebase Social Logins

A react component for quick firebase social 0Auth login. Pass a firebase ref to the component, and it handles login for the supported third-party providers.

## Live demo
See [here](http://AljoschaMeyer.github.io/react-firebase-social-logins/) for an example app where you can do nothing but logging in (and out).

Code for the demo is [here](https://github.com/AljoschaMeyer/react-firebase-social-logins/blob/master/example/src/example.js).

## Installation

The easiest way to use react-firebase-social-logins is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-firebase-social-logins.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-firebase-social-logins --save
```


## Usage

The component takes a ref to the firebase. When the user clicks on one of the buttons, the buttons are disabled while login is attempted. If authorization is successfull, the user is logged in. See the [example code](http://AljoschaMeyer.github.io/react-firebase-social-logins/) for basic usage.

```
var SocialLogins = require('react-firebase-social-logins');

<SocialLogins
  fireRef={this.fireRef}/>
```

### Properties

- `fireRef`: Reference to a firebase. Required.
- `providers`: An array specifying which login buttons to include in the component (and their order). Defaults to `['google', 'facebook', 'twitter', 'github']`.
- `textFn`: For each value in `providers`, this function is called to determine the text next to the icon. If `null` is returned, only the icon is rendered. Always returns `null` by default.
- `errorHandler`: This is called with the error returned by `fireRef.authWithOAuthPopup` or `fireRef.authWithOAuthRedirect()` if neither authentication via popup nor via redirect succeeded. Does nothing by default.
- `btnProps`: Properties object which is passed down to all buttons in the component.
