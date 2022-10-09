# Google Play Service OAuth

![Continuous Integration](https://github.com/nirgn975/google-play-services-oauth/workflows/Continuous%20Integration/badge.svg?branch=master) [![codecov](https://codecov.io/gh/nirgn975/google-play-services-oauth/branch/master/graph/badge.svg)](https://codecov.io/gh/nirgn975/google-play-services-oauth)

[<img src="https://raw.githubusercontent.com/nirgn975/google-play-services-oauth/master/assets/play-services-logo.png" align="right" width="100">](https://developers.google.com/android/guides/overview)

> Google Play Services is a proprietary background service and API package for Android devices from Google. Among other things it provides Google Sign-in Android API for single sign-on, authenticating the user inside applications using current credentials.

An unofficial TypeScript client for Google Play Services OAuth.

## Installation

```bash
npm install --save-dev google-play-services-oauth
```

## Usage

```typescript
import * from google-play-services-oauth

var GoogleOauth = require("../oauth");

var EMAIL = 'your_google_email';
var PASSWORD = 'your_email_password';
var ANDROID_ID = 'your_android_id'
var SERVICE = 'your_service'
var APP = 'your_android'
var CLIENT_SIG = 'your_client_sig'

var google = new GoogleOauth();
google.login(EMAIL, PASSWORD, ANDROID_ID, function (err, data) {
    if (data) {
        google.oauth(EMAIL, data.masterToken, data.androidId, SERVICE, APP, CLIENT_SIG, function (err, data) {
            console.log(data);
        });
    }
});
```

## Want to help?

Great! Here is how you can install the project on your local machine.

1. Git clone your fork locally.
2. `npm install` inside the new directory.
3. Start coding..
4. Make a Pull Request!
